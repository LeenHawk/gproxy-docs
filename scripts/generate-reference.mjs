// Export the reference JSON from a gproxy checkout. gproxy's CI runs this and
// commits the result to public/generated/; run it by hand only to preview
// unreleased Rust changes. The checkout defaults to the parent directory, which
// is where gproxy keeps this repository as its `docs/` submodule. This uses the
// SDK's existing channel feature group, so adding a channel needs no docs-only list.
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = process.env.GPROXY_ROOT
  ? resolve(process.env.GPROXY_ROOT)
  : fileURLToPath(new URL('../../', import.meta.url));
const output = fileURLToPath(new URL('../public/generated/', import.meta.url));
const metadata = JSON.parse(execFileSync('cargo', [
  'metadata', '--locked', '--no-deps', '--format-version', '1',
], { cwd: root, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 }));
const sdk = metadata.packages.find((pkg) => pkg.name === 'gproxy-sdk');
const channel = metadata.packages.find((pkg) => pkg.name === 'gproxy-channel');
const features = sdk.features.channels.map((name) => {
  if (!(name in channel.features)) throw new Error(`Unknown channel feature: ${name}`);
  // The registry and descriptors do not need the SDK's optional transports.
  return `gproxy-channel/${name}`;
});
execFileSync('cargo', [
  'run', '--locked', '-p', 'gproxy-host-axum', '--example', 'export-docs',
  '--no-default-features', '--features', ['documentation', ...features].join(','),
  '--', output,
], { cwd: root, stdio: 'inherit' });
