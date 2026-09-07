import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

// Test the actual static output, including the MDX compiler and shared layout.
const readOptionalFile = async (url) => {
  try {
    return await readFile(url, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return undefined;
    throw error;
  }
};
const readPage = async (path, optional = false) => {
  const url = new URL(`../out/${path}`, import.meta.url);
  const html = optional ? await readOptionalFile(url) : await readFile(url, "utf8");
  return html?.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
};
const index = await readPage("writing.html");
const sample = await readPage("writing/learning-to-notice.html");
const templateSource = await readOptionalFile(new URL("../content/writing/formatting-reference.mdx", import.meta.url));
const template = await readPage("writing/formatting-reference.html", templateSource === undefined);
const shortPost = await readPage("writing/test.html", true);

test("the writing index includes the available starter posts in date order", () => {
  assert.match(index, /09\/06\/26/);
  assert.match(index, /href="\/writing\/learning-to-notice"/);
  if (template !== undefined) {
    assert.match(index, /09\/05\/26/);
    assert.ok(index.indexOf('href="/writing/learning-to-notice"') < index.indexOf('href="/writing/formatting-reference"'));
  } else {
    assert.doesNotMatch(index, /href="\/writing\/formatting-reference"/);
  }
  assert.ok((index.match(/class="writing-entry"/g) ?? []).length >= (template === undefined ? 1 : 2));
  const entries = [...index.matchAll(/<a class="writing-entry"[^>]*>/g)].map((match) => match[0]);
  assert.ok(entries.length > 0);
  entries.forEach((entry) => {
    assert.doesNotMatch(entry, /target="_blank"/);
  });
});

for (const [slug, html, footnotes] of [
  ["learning-to-notice", sample, 1],
  ...(template === undefined ? [] : [["formatting-reference", template, 2]]),
]) {
  test(`${slug} exports a complete article, active navigation, and canonical URL`, () => {
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
    assert.match(html, /aria-current="page" href="\/writing"/);
    assert.match(html, new RegExp(`<link rel="canonical" href="https://natashatran.dev/writing/${slug}"`));
    assert.equal((html.match(/class="writing-back" href="\/writing"/g) ?? []).length, 2);
    assert.match(html, /property="og:type" content="article"/);
  });

  test(`${slug} has working footnote and return targets`, () => {
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(new Set(ids).size, ids.length, "HTML IDs must be unique");
    const targets = [...html.matchAll(/href="#(user-content-fn(?:ref)?-[^"]+)"/g)].map((match) => match[1]);
    assert.equal(targets.length, footnotes * 2);
    targets.forEach((id) => assert.ok(ids.includes(id), `Missing anchor target: ${id}`));
    assert.match(html, /<h2[^>]*>Footnotes<\/h2>/);
  });
}

test("the short test post keeps its top back link while hiding the bottom link", { skip: shortPost === undefined }, () => {
  assert.equal((shortPost.match(/class="writing-back" href="\/writing"/g) ?? []).length, 1);
  assert.match(shortPost, /<main[^>]*>\s*<a class="writing-back" href="\/writing">/);
  assert.doesNotMatch(shortPost, /<footer[^>]*>[\s\S]*?class="writing-back"/);
  assert.match(shortPost, /aria-current="page" href="\/writing"/);
  assert.doesNotMatch(shortPost, /<footer class="post-footer">\s*<\/footer>/);
});

test("the sample essay does not include the template source panel", () => {
  assert.doesNotMatch(sample, /class="post-source"/);
});

test("external post links open safely in a new tab while footnotes stay in-page", () => {
  const externalLink = sample.match(/<a[^>]*href="https:\/\/en\.wikipedia\.org\/wiki\/Curiosity"[^>]*>/)?.[0];
  assert.ok(externalLink);
  assert.match(externalLink, /target="_blank"/);
  assert.match(externalLink, /rel="noopener noreferrer"/);

  const footnoteLink = sample.match(/<a[^>]*href="#user-content-fn-attention"[^>]*>/)?.[0];
  assert.ok(footnoteLink);
  assert.doesNotMatch(footnoteLink, /target="_blank"/);
});

test("the template includes reusable formatting", { skip: template === undefined }, () => {
  assert.match(template, /<details class="post-source">/);
  assert.match(template, /copy post source/);
  assert.match(template, /<table>/);
  assert.match(template, /<blockquote>/);
  assert.match(template, /class="language-javascript"/);
  assert.match(template, /class="post-note"/);
  assert.match(template, /<figure class="post-figure">/);
  assert.match(template, /href="#reference-a"/);
  assert.match(template, /id="reference-a"/);
  assert.match(template, /Fictional source/);
});

test("the template includes its exact copyable source", { skip: templateSource === undefined }, () => {
  const escaped = templateSource.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#x27;");
  assert.ok(template.includes(escaped), "Copyable source must match the authoring file");
});

test("the tweet has an accessible fallback before external scripts load", { skip: template === undefined }, () => {
  assert.match(template, /class="post-tweet-fallback"/);
  assert.match(template, /href="https:\/\/twitter.com\/i\/web\/status\/20"/);
  assert.match(template, /View this tweet on X \(Twitter\)/);
});

test("all indexed posts are in the static sitemap", async () => {
  const sitemap = await readPage("sitemap.xml");
  const slugs = [...index.matchAll(/href="\/writing\/([a-z0-9-]+)"/g)].map((match) => match[1]);
  assert.ok(slugs.includes("learning-to-notice"));
  for (const slug of slugs) {
    assert.ok(sitemap.includes(`https://natashatran.dev/writing/${slug}`));
  }
});
