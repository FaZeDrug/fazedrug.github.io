# Writing posts

Each post is one `.mdx` file in `content/writing/`. MDX is Markdown with optional components for notes, figures, and tweets. The shared layout supplies the title, date, typography, and back links. Next.js exports the posts as static HTML for the existing GitHub Pages workflow.

## Add a post

1. Copy `content/writing/formatting-reference.mdx` to a new file, such as `content/writing/a-small-observation.mdx`. Or open **a writing template** in the browser, expand **use this template**, and choose **copy post source**.
2. Edit the `post` export at the top. Remove `template: true` and the example `updated` date from a normal post.
3. Replace the example body, keeping only the formatting you need. Start sections with `##`; the page already supplies the title as its only H1.
4. Preview with `npm run dev`. The new post is automatically listed, newest first. Its filename becomes `/writing/a-small-observation`.

```mdx
export const post = {
  title: 'a small observation',
  date: '2026-09-06',
  description: 'A short description for link previews and search results.',
};

A paragraph with **bold**, *italics*, and a [link](https://example.com).

## A section

Something worth thinking about.[^aside]

[^aside]: A footnote with an automatic return link.
```

Use lowercase, hyphen-separated filenames and dates in `YYYY-MM-DD` format. An optional `updated` field shows an updated date below the article. Files beginning with `_`, such as `_draft.mdx`, are excluded from the writing list, routes, and sitemap. Removing the underscore includes a post on the next build. MDX is trusted repository code; write and review it as you would any source file.

For a short post, add `hideBottomBackLink: true` inside its `post` export to hide only the bottom **back to writing** link. The top link stays visible. To hide both links, use `hideBackLinks: true` instead; the main **writing** navigation link remains available. Omit both options (or set them to `false`) to show both back links.

## Formatting

The local **a writing template** post is a live formatting reference. Its source demonstrates paragraphs, H2/H3 headings, links, bold/italics, lists, an attributed quote, citations, footnotes, inline code, fenced code blocks, a table, a note, a figure, and a tweet.

`content/writing/formatting-reference.mdx` is gitignored for now and stays on your computer. It is not backed up by Git and will be absent from a fresh checkout. Gitignore does not exclude it from a build made on a computer where the file exists.

- **Footnotes:** write `[^name]` inline, then `[^name]: Your note.` below. Numbering and return links are generated automatically.
- **Citations:** link to the source inline or to a named reference at the bottom. The template’s `[A]` entry is explicitly fictional; replace it with your real source.
- **Code:** use backticks for inline code, or triple-backtick fences with a language such as `javascript`. Blocks keep their spacing and scroll on narrow screens.
- **Tables:** use normal Markdown tables; the table region scrolls if it is wider than the screen.

These components are available in every post without imports:

```mdx
<Note title="Note">
  A little context or an aside.
</Note>

<Figure
  src="/writing/my-photo.jpg"
  alt="Describe the photograph’s relevant content."
  width={1200}
  height={800}
  caption="Figure 1. A short caption."
  credit="Photo by Natasha Tran."
/>

<Tweet id="20" />
```

Put images in `public/writing/` (create the folder when adding your first image). The image URL starts with `/writing/`, without `public`. Include its actual dimensions and a meaningful alt description. Omit `src` to show the example placeholder used in the template.

For a tweet, copy only the numeric ID from the end of its Twitter/X URL. ID `20` is the historical example used in X’s documentation. The real embed loads in the reader’s browser, follows the site’s light/dark mode, and keeps a source link visible if X is blocked or the tweet is unavailable. Posts and builds do not depend on fetching tweets. The normal X widget makes requests to X; it is loaded only on pages containing a tweet, with its `dnt` option enabled.

## Structure and checks

- `lib/writing.ts` discovers local posts, checks their metadata, sorts dates, and supplies the static routes and sitemap.
- `app/writing/[slug]/page.tsx` renders the shared article layout and per-post metadata.
- `mdx-components.tsx` provides reusable formatting components; `app/writing/writing.css` styles only writing pages using the existing site fonts and theme.
- The title/date/description export is the single source of post metadata. There is no second list to maintain.

```sh
npm run build
npm run test:writing
npm run lint
```

The build produces `out/` for GitHub Pages. `test:writing` checks the exported posts, metadata, source template, footnotes, and fallback link. The existing Pages workflow builds and deploys on a push to `main`; editing locally does not publish the changes.

References: [Next.js MDX](https://nextjs.org/docs/app/guides/mdx), [X embedded-post options](https://docs.x.com/x-for-websites/embedded-posts/guides/embedded-tweet-parameter-reference).
