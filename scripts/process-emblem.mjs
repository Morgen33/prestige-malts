/**
 * Processes the ornate Prestige Malts emblem (gold artwork on black) into a
 * transparent-background PNG, recoloured onto the site's gold-foil ramp — the
 * same stops as the `.gold-text` gradient in globals.css — so the emblem and
 * the hero type read as one metal.
 *
 * Alpha is keyed from brightness: black background melts away, gold strokes
 * stay. Luminance is then mapped through the ramp so the engraved shading
 * survives the retint.
 *
 * Usage: node scripts/process-emblem.mjs [input]  (default: assets-src-emblem.png)
 * Output: public/emblem.png
 */
import sharp from "sharp";

const input = process.argv[2] ?? "assets-src-emblem.png";

// The .gold-text ramp, dark → light.
const RAMP = [
  { at: 0.0, rgb: [107, 76, 20] }, // deep bronze shadow
  { at: 0.45, rgb: [169, 121, 31] }, // #a9791f
  { at: 0.72, rgb: [200, 149, 47] }, // #c8952f
  { at: 1.0, rgb: [240, 217, 160] }, // #f0d9a0 highlight
];

function ramp(t) {
  for (let i = 1; i < RAMP.length; i++) {
    if (t <= RAMP[i].at) {
      const a = RAMP[i - 1];
      const b = RAMP[i];
      const k = (t - a.at) / (b.at - a.at);
      return [
        Math.round(a.rgb[0] + (b.rgb[0] - a.rgb[0]) * k),
        Math.round(a.rgb[1] + (b.rgb[1] - a.rgb[1]) * k),
        Math.round(a.rgb[2] + (b.rgb[2] - a.rgb[2]) * k),
      ];
    }
  }
  return RAMP[RAMP.length - 1].rgb;
}

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const px = width * height;
const out = Buffer.alloc(px * 4);

for (let i = 0; i < px; i++) {
  const r = data[i * channels];
  const g = data[i * channels + 1];
  const b = data[i * channels + 2];
  // Perceptual luminance, 0..1
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  // Bright → opaque. The source black carries noise, so alpha ramps from a
  // hard floor (0.09) to fully opaque by 0.30 luminance — background gone,
  // antialiased stroke edges preserved.
  const t = Math.min(1, Math.max(0, (lum - 0.09) / 0.21));
  const a = Math.round(t ** 0.9 * 255);
  const [tr, tg, tb] = ramp(lum);
  out[i * 4] = tr;
  out[i * 4 + 1] = tg;
  out[i * 4 + 2] = tb;
  out[i * 4 + 3] = a;
}

await sharp(out, { raw: { width, height, channels: 4 } })
  .png()
  .toFile("public/emblem.png");

console.log(`wrote public/emblem.png (${width}x${height})`);

// Ink variant for the cream bottle labels: same alpha key, constant dark ink —
// the emblem as a printer's stamp.
const ink = Buffer.alloc(px * 4);
for (let i = 0; i < px; i++) {
  ink[i * 4] = 33; // #211e1b
  ink[i * 4 + 1] = 30;
  ink[i * 4 + 2] = 27;
  ink[i * 4 + 3] = out[i * 4 + 3];
}
await sharp(ink, { raw: { width, height, channels: 4 } })
  .resize({ width: 560 }) // labels never need full resolution
  .png()
  .toFile("public/emblem-ink.png");

console.log("wrote public/emblem-ink.png");
