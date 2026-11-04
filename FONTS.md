# Legacy console fonts

`public/fonts/` is served at `https://gproxy.leenhawk.com/fonts/`. Clients
released before the console switched to public npm CDNs download their optional
font pack from here, by SHA-256 file name. `_headers` permits cross-origin reads
and gives the font files a one-year immutable cache lifetime.

The directory is frozen: current clients download from npmmirror, jsDelivr or
unpkg instead, as described in gproxy's `console/FONTS.md`. Do not add files, and
do not delete any while released clients may still reference them.
