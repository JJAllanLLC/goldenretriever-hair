# IndexNow

IndexNow notifies participating search engines when URLs on this site change so they can crawl updates sooner. A successful submission reports a change; it does not guarantee indexing.

## Public key file

Verification key (public by design):

`public/5875b1c7470e49998de7700cd9a9f3f4.txt`

After production deploy it must be reachable at:

`https://goldenretriever.hair/5875b1c7470e49998de7700cd9a9f3f4.txt`

The submission script reads this file; do not hardcode a second copy of the key in source.

## Dry run

Validate URLs and print the payload without calling IndexNow:

```bash
npm run indexnow:dry-run -- /guides/example-page
```

You can pass multiple root-relative paths or full `https://goldenretriever.hair/...` URLs.

## Submit changed URLs

Submit **only after** the production deployment that contains those URL changes is live.

```bash
npm run indexnow:submit -- /guides/example-page
```

Submit URLs that were **added, updated, redirected, or deleted**. Do not repeatedly submit the full sitemap.

Live requests require the explicit `--submit` flag (used by `indexnow:submit`). Without it, the script only dry-runs.
