// Render the exported reference JSON into MDX snippets, one per locale, which
// the configuration-schema and channel-catalog pages import. Mintlify cannot
// run a script at build time, so these files are committed: gproxy's CI runs
// this through generate-reference.mjs together with the export.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { labels } from './reference-labels.mjs';

const root = new URL('../', import.meta.url);
const read = (name) => JSON.parse(readFileSync(new URL(`generated/${name}`, root), 'utf8'));
const out = fileURLToPath(new URL('snippets/generated/', root));
const schema = read('configuration.schema.json');
const defaults = read('configuration.defaults.json');
const catalog = read('channels.json');

// Text in a table cell: one line, and nothing MDX would read as JSX or an
// expression. Rust intra-doc links point at names, not URLs; keep the label.
const cell = (text = '') => text
  .replace(/\[([^\]]+)\]\((?:crate|self|super)::[^)]+\)/g, '$1')
  .replace(/\s*\n\s*/g, ' ')
  .replace(/\|/g, '\\|')
  .replace(/[{}<>]/g, (c) => ({ '{': '\\{', '}': '\\}', '<': '&lt;', '>': '&gt;' })[c])
  .trim();
// Inline code inside a table: backticks cannot be escaped, so use a fence
// longer than any run inside; `|` still splits GFM cells and must be escaped.
const code = (text) => {
  const value = String(text).replace(/\|/g, '\\|');
  const fence = '`'.repeat(Math.max(0, ...[...value.matchAll(/`+/g)].map((m) => m[0].length)) + 1);
  return `${fence}${fence.length > 1 ? ' ' : ''}${value}${fence.length > 1 ? ' ' : ''}${fence}`;
};
const table = (head, rows) => rows.length === 0 ? '' : [
  `| ${head.join(' | ')} |`, `| ${head.map(() => '---').join(' | ')} |`,
  ...rows.map((row) => `| ${row.join(' | ')} |`),
].join('\n') + '\n';
const json = (value) => '```json\n' + JSON.stringify(value, null, 2) + '\n```\n';
const typeName = (value) => {
  if (value.$ref) return value.$ref.split('/').at(-1);
  if (value.anyOf || value.oneOf) return (value.anyOf || value.oneOf).map(typeName).join(' | ');
  if ('const' in value) return JSON.stringify(value.const);
  if (value.enum) return value.enum.map((item) => JSON.stringify(item)).join(' | ');
  if (value.type === 'array') return `Array<${typeName(value.items)}>`;
  return Array.isArray(value.type) ? value.type.join(' | ') : value.type ?? 'any';
};

const fields = (definition, t) => table(
  [t.field, t.type, t.required, t.default, t.description],
  Object.entries(definition.properties ?? {}).map(([name, value]) => [
    code(name), code(typeName(value)),
    (definition.required ?? []).includes(name) ? t.yes : t.no,
    'default' in value ? code(JSON.stringify(value.default)) : '—',
    cell(value.description),
  ]),
);

const configuration = (t) => {
  let page = `[${t.download} JSON Schema](/generated/configuration.schema.json) · [${t.defaults}](/generated/configuration.defaults.json)\n\n`;
  page += `## AppConfig\n\n${fields(schema, t)}\n`;
  for (const [name, definition] of Object.entries(schema.$defs ?? {})) {
    page += `## ${name}\n\n`;
    if (definition.description) page += `${cell(definition.description)}\n\n`;
    if (definition.oneOf) {
      for (const variant of definition.oneOf) {
        page += `### ${variant.properties?.kind?.const ?? variant.title ?? name}\n\n`;
        if (variant.description) page += `${cell(variant.description)}\n\n`;
        page += `${fields(variant, t)}\n`;
      }
    } else {
      page += `${fields(definition, t)}\n`;
    }
  }
  page += `## ${t.defaults}\n\n${json(defaults)}\n`;
  page += `<Accordion title="${t.completeSchema}">\n\n${json(schema)}\n</Accordion>\n`;
  return page;
};

const channels = (t) => {
  let page = `GPROXY ${catalog.version}. [${t.jsonDownload}](/generated/channels.json).\n\n`;
  page += `## ${t.hostConfig}\n\n` + table([t.key, t.kind, t.description],
    catalog.hostConfigKeys.map((key) => [code(key.name), t[key.kind] ?? key.kind, cell(key.description)])) + '\n';
  for (const { descriptor: channel, services } of catalog.channels) {
    page += `## ${channel.displayName} \`${channel.id}\`\n\n`;
    const login = channel.loginModes.map((mode) => t[mode] ?? mode).join(' / ') || t.none;
    page += `${t.login}: ${login}. ${t.credentials}: ${code(channel.credentialKinds.join(', ') || t.none)}.\n\n`;
    page += table([t.capability, t.supported], Object.entries(channel.capabilities)
      .map(([name, supported]) => [t[name] ?? name, supported ? t.yes : t.no])) + '\n';
    page += table([t.key, t.kind, t.required, t.description, t.placeholder], channel.configKeys.map((key) => [
      code(key.name), t[key.kind] ?? key.kind, key.required ? t.yes : t.no, cell(key.description),
      key.placeholder ? code(key.placeholder) : '—',
    ]));
    if (channel.configKeys.length) page += '\n';
    if (services.length) {
      page += `<Accordion title="${t.services} (${services.length})">\n\n` + table(
        [t.method, t.path, t.transport, t.access, t.idempotent],
        services.map((route) => [
          code(route.method), code(route.path), route.transport === 'web_socket' ? 'WebSocket' : 'HTTP',
          (t[route.class.class] ?? route.class.class) + (route.class.class === 'resource'
            ? `: ${code(route.class.kind)} / ${t[route.class.access] ?? route.class.access}` : ''),
          route.idempotent ? t.yes : t.no,
        ])) + '\n</Accordion>\n\n';
    }
  }
  return page;
};

mkdirSync(out, { recursive: true });
const header = '{/* Generated by scripts/render-reference.mjs from generated/*.json; do not edit. */}\n\n';
for (const locale of ['en', 'zh-cn', 'zh-tw', 'ru']) {
  writeFileSync(`${out}configuration.${locale}.mdx`, header + configuration(labels[locale]));
  writeFileSync(`${out}channels.${locale}.mdx`, header + channels(labels[locale]));
}
console.log(`Rendered configuration and channel reference snippets into ${out}`);
