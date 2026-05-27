// Generates the PNG PWA icons (192, 512) and the iOS apple-touch-icon (180)
// from a simple gradient + "u7" glyph, without external dependencies.
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
mkdirSync(outDir, { recursive: true });

const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function pngFromRGBA(width, height, rgba) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (width * 4 + 1)] = 0; // filter: none
    rgba.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// 7x7 bitmap font for the glyphs we need.
const glyphs = {
  u: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  7: ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
};

function drawGlyph(rgba, size, ch, ox, oy, scale, color) {
  const rows = glyphs[ch];
  for (let r = 0; r < rows.length; r++) {
    for (let c = 0; c < rows[r].length; c++) {
      if (rows[r][c] !== "1") continue;
      for (let dy = 0; dy < scale; dy++) {
        for (let dx = 0; dx < scale; dx++) {
          const x = ox + c * scale + dx;
          const y = oy + r * scale + dy;
          if (x < 0 || y < 0 || x >= size || y >= size) continue;
          const i = (y * size + x) * 4;
          rgba[i] = color[0];
          rgba[i + 1] = color[1];
          rgba[i + 2] = color[2];
          rgba[i + 3] = 255;
        }
      }
    }
  }
}

function render(size) {
  const rgba = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const t = (x + y) / (2 * size);
      const i = (y * size + x) * 4;
      rgba[i] = Math.round(56 + (99 - 56) * t); // 0x38 -> 0x63
      rgba[i + 1] = Math.round(189 + (102 - 189) * t); // 0xbd -> 0x66
      rgba[i + 2] = Math.round(248 + (241 - 248) * t); // 0xf8 -> 0xf1
      rgba[i + 3] = 255;
    }
  }
  // "u7" centered, dark glyph
  const scale = Math.max(2, Math.round(size / 16));
  const glyphW = 5 * scale;
  const gap = scale;
  const totalW = glyphW * 2 + gap;
  const oy = Math.round((size - 7 * scale) / 2);
  const ox = Math.round((size - totalW) / 2);
  const dark = [15, 23, 42];
  drawGlyph(rgba, size, "u", ox, oy, scale, dark);
  drawGlyph(rgba, size, "7", ox + glyphW + gap, oy, scale, dark);
  return pngFromRGBA(size, size, rgba);
}

const targets = [
  ["pwa-192x192.png", 192],
  ["pwa-512x512.png", 512],
  ["apple-touch-icon.png", 180],
];

for (const [name, size] of targets) {
  writeFileSync(join(outDir, name), render(size));
  console.log("wrote", name, `(${size}x${size})`);
}
