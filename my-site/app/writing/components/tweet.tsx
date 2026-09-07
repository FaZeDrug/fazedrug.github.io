"use client";

import { useEffect, useRef } from "react";

type TwitterWidgets = {
  createTweet: (
    id: string,
    container: HTMLElement,
    options: {
      theme: "light" | "dark";
      width: number;
      conversation: "none";
      dnt: boolean;
    },
  ) => Promise<HTMLElement | undefined>;
};

type TwitterApi = {
  widgets?: TwitterWidgets;
  ready?: (callback: (api: TwitterApi) => void) => void;
};

declare global {
  interface Window {
    twttr?: TwitterApi;
  }
}

const scriptUrl = "https://platform.twitter.com/widgets.js";
const scriptId = "writing-twitter-widgets";
let widgetsPromise: Promise<TwitterWidgets> | null = null;

function loadWidgets(): Promise<TwitterWidgets> {
  if (window.twttr?.widgets?.createTweet) {
    return Promise.resolve(window.twttr.widgets);
  }
  if (widgetsPromise) return widgetsPromise;

  widgetsPromise = new Promise<TwitterWidgets>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${scriptUrl}"]`,
    );
    const script = existingScript ?? document.createElement("script");
    let settled = false;

    function cleanUp() {
      window.clearTimeout(timeout);
      script.removeEventListener("load", onLoad);
      script.removeEventListener("error", onError);
    }

    function onReady(api: TwitterApi) {
      if (settled || !api.widgets?.createTweet) return;
      settled = true;
      cleanUp();
      resolve(api.widgets);
    }

    function onLoad() {
      const api = window.twttr;
      if (!api) return;
      onReady(api);
      if (!settled) api.ready?.(onReady);
    }

    function onError() {
      if (settled) return;
      settled = true;
      cleanUp();
      // A later visit can try again after a transient network failure.
      if (script.id === scriptId) script.remove();
      reject(new Error("Twitter embeds are unavailable."));
    }

    const timeout = window.setTimeout(onError, 10_000);
    script.addEventListener("load", onLoad);
    script.addEventListener("error", onError);
    onLoad();

    if (!existingScript && !settled) {
      script.id = scriptId;
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
    }
  }).catch((error: unknown) => {
    widgetsPromise = null;
    throw error;
  });

  return widgetsPromise;
}

export function Tweet({ id }: { id: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    const fallback = fallbackRef.current;
    if (!mount || !fallback) return;

    let disposed = false;
    let revision = 0;
    let theme = document.documentElement.dataset.theme;

    async function renderTweet() {
      const currentRevision = ++revision;
      // Each render gets its own node so a late response cannot overwrite a
      // newer theme or append a duplicate widget after navigation.
      const target = document.createElement("div");
      mount!.replaceChildren(target);
      fallback!.hidden = false;

      try {
        const widgets = await loadWidgets();
        if (disposed || currentRevision !== revision) return;

        const element = await widgets.createTweet(id, target, {
          theme: theme === "dark" ? "dark" : "light",
          width: 550,
          conversation: "none",
          dnt: true,
        });

        if (disposed || currentRevision !== revision) return;
        const iframe =
          element?.tagName === "IFRAME"
            ? element
            : element?.querySelector("iframe");

        if (iframe && target.contains(iframe)) {
          fallback!.hidden = true;
        } else {
          target.replaceChildren();
        }
      } catch {
        // The original link stays readable when scripts are blocked or a
        // tweet is unavailable. Other article content never depends on X.
        if (!disposed && currentRevision === revision) {
          target.replaceChildren();
        }
      }
    }

    void renderTweet();

    const observer = new MutationObserver(() => {
      const nextTheme = document.documentElement.dataset.theme;
      if (nextTheme === theme) return;
      theme = nextTheme;
      void renderTweet();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      disposed = true;
      revision += 1;
      observer.disconnect();
      mount.replaceChildren();
    };
  }, [id]);

  return (
    <div className="post-tweet">
      <div ref={mountRef} className="post-tweet-mount" />
      <p ref={fallbackRef} className="post-tweet-fallback">
        <a href={`https://twitter.com/i/web/status/${id}`}>
          View this tweet on X (Twitter) ↗
        </a>
      </p>
    </div>
  );
}
