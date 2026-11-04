# GPROXY documentation

The source of <https://gproxy.leenhawk.com>. It is also the `docs/` submodule of
[LeenHawk/gproxy](https://github.com/LeenHawk/gproxy), and is mirrored to
GitLab, CNB and git.lin.pub.

## Build

Use the Node version pinned in `.github/workflows/docs.yml`, then:

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm build
```

`bash scripts/check-docs.sh` reports sidebar slugs without a page, locale page
parity, forbidden references and oversized pages.

Pushes to `main` deploy to Cloudflare Pages and sign `public/notifications.json`
with the update signing key; `dev` only builds. Every push is mirrored to CNB.

## Reference JSON

`public/generated/` is committed by gproxy's CI. On every push to gproxy's
`main` or `dev`, it runs `scripts/generate-reference.mjs` against that commit
and commits the result to the branch of the same name here. To preview an
unreleased Rust change, run it yourself from a gproxy checkout (the parent
directory when this repository is gproxy's submodule, or `GPROXY_ROOT`):

```sh
pnpm generate:reference
```

That runs the `gproxy-host-axum` `export-docs` example with the optional
`documentation` feature and all channels named by the SDK's `channels` feature
group. It does not start the gateway, open a database or contact upstream
providers. It writes:

- `openapi.json`: `utoipa` describes the HTTP operations; `schemars` derives
  complete request/response schemas from wire types and management DTOs.
  Forwarding, management, portal, OAuth and system APIs share one specification.
  SSE event schemas use `x-event-schema` beside the text stream; WebSocket
  messages use `x-websocket`. Multipart files and binary responses retain their
  content types. Input/output contracts have separate component namespaces.
  The build parses actual management/portal router declarations with `syn` and
  refuses to export if any method/path is missing or added only in the docs.
- `configuration.schema.json`: `schemars` derives the shared `AppConfig`
  shape, Serde names, defaults and documentation from Rust types. Runtime
  validation such as master-key decoding is not represented by this schema.
- `configuration.defaults.json`: `AppConfig::default()`, not local settings.
- `channels.json`: compiled channel descriptors, host configuration keys and
  vendor service classifications. Declarations do not prove live account
  access or support for every protocol operation. Placeholders are not defaults.

The English, Simplified Chinese, Traditional Chinese and Russian MDX pages render these
JSON files through Astro components. Labels are localized; the generated
descriptions come from Rust doc comments and stay in English in every locale.

The API reference links every payload to its complete data-structure definition.
`starlight-llms-txt` renders those same pages into `llms-full.txt`,
`llms-small.txt` and `_llms-txt/api-and-configuration.txt`. `llms.txt` links
the documentation sets and machine-readable exports. The JSON files are also
published as static files.

`/llms-api.txt`, `/zh-cn/llms-api.txt`, `/zh-tw/llms-api.txt` and `/ru/llms-api.txt` contain the
complete OpenAPI schemas, configuration schema and channel catalogue in each
language. Unlike the compact overview, these files never remove expandable
payload definitions. `llms.txt` links all four language variants.

Keep each localized content tree aligned with the English pages, including
sidebar labels, download-page copy and localized internal links. Russian
tutorial pages reuse the English video with `ru.vtt` subtitles; they do not
claim a Russian audio track. The privacy page is generated from
`distribution/mobile/privacy/privacy-ru.txt` by `scripts/mobile/sync-listings.py`.

Normal gateway builds do not enable the optional `schema` or `documentation`
features. No runtime documentation endpoint is added. Required-but-nullable
wire fields carry `x-gproxy-required` during derivation; the exporter converts
it into JSON Schema `required` without stripping null from the accepted values.
