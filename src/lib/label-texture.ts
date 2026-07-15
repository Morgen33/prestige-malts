import * as THREE from "three";
import type { Product } from "@/data/types";
import { ageLabel } from "./format";

/** Fields for a personalised private-cask label, typeset live as the user types. */
export interface BespokeLabelData {
  /** Name or house on the bottle, e.g. "The Harrington Family" */
  name: string;
  /** Optional dedication line, e.g. "Laid down for Amelia, born 2024" */
  dedication: string;
  /** Cask style shown on the label, e.g. "Oloroso Sherry Cask" */
  caskLabel: string;
}

/**
 * Generates a bespoke label texture from product fields onto a 2D canvas,
 * then wraps it as a THREE.CanvasTexture. This is what makes every bottle look
 * unique with zero photography: the house mark, distillery, cask number, age
 * and ABV are all typeset live.
 *
 * The canvas is sized to wrap a cylinder, so we render the label centred on a
 * transparent field with generous margins either side.
 */
export function createLabelTexture(product: Product): THREE.CanvasTexture {
  const W = 1024;
  const H = 512;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // Transparent field; the label panel sits in the centre third (front of bottle).
  ctx.clearRect(0, 0, W, H);

  const panelW = W * 0.34;
  const panelX = (W - panelW) / 2;
  const panelY = H * 0.08;
  const panelH = H * 0.84;

  // Aged-cream label stock
  ctx.fillStyle = "#f4ede0";
  roundRect(ctx, panelX, panelY, panelW, panelH, 8);
  ctx.fill();

  // Brass hairline border
  ctx.strokeStyle = "#b89258";
  ctx.lineWidth = 2;
  roundRect(ctx, panelX + 8, panelY + 8, panelW - 16, panelH - 16, 4);
  ctx.stroke();

  const cx = W / 2;
  const charcoal = "#211e1b";
  const amber = "#a9791f";

  ctx.textAlign = "center";

  // Typeset everything below the crest area first; the house emblem is drawn
  // asynchronously into the reserved space at the top once its image loads.
  const crestBottom = panelY + 152;

  // Distillery (display serif)
  ctx.fillStyle = charcoal;
  ctx.font = "700 32px Georgia, serif";
  wrapCentered(ctx, product.distillery, cx, crestBottom + 32, panelW * 0.8, 32);

  // Region
  ctx.fillStyle = amber;
  ctx.font = "500 14px Georgia, serif";
  ctx.fillText(`${product.region.toUpperCase()}`, cx, crestBottom + 72);

  // Divider
  ctx.strokeStyle = "#b89258";
  ctx.lineWidth = 1;
  line(ctx, cx - panelW * 0.26, crestBottom + 90, cx + panelW * 0.26, crestBottom + 90);

  // Vintage / age
  ctx.fillStyle = charcoal;
  ctx.font = "600 24px Georgia, serif";
  ctx.fillText(`${product.vintage}`, cx, crestBottom + 126);
  ctx.font = "400 14px Georgia, serif";
  ctx.fillText(ageLabel(product.age), cx, crestBottom + 148);

  // Divider
  line(ctx, cx - panelW * 0.26, crestBottom + 168, cx + panelW * 0.26, crestBottom + 168);

  // Cask + ABV footer
  ctx.fillStyle = charcoal;
  ctx.font = "500 15px Georgia, serif";
  ctx.fillText(`SINGLE CASK ${product.caskNumber}`, cx, crestBottom + 200);
  ctx.font = "400 13px Georgia, serif";
  ctx.fillText(
    `${product.abv.toFixed(1)}% ABV  ·  ${product.sizeMl}ml`,
    cx,
    crestBottom + 222
  );
  ctx.font = "400 11px Georgia, serif";
  ctx.fillStyle = amber;
  ctx.fillText("NON CHILL-FILTERED · NATURAL COLOUR", cx, crestBottom + 252);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  // House emblem, stamped in ink at the top of every label. Drawn once the
  // PNG decodes, then the texture refreshes.
  drawEmblem(ctx, texture, cx, panelY);

  return texture;
}

/**
 * Personalised private-cask label — the visitor's name, story and cask choice
 * typeset live in the house style. Same stock, same crest, their legacy.
 */
export function createBespokeLabelTexture(
  data: BespokeLabelData
): THREE.CanvasTexture {
  const W = 1024;
  const H = 512;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, W, H);

  const panelW = W * 0.34;
  const panelX = (W - panelW) / 2;
  const panelY = H * 0.08;
  const panelH = H * 0.84;

  // Aged-cream label stock + brass hairline border
  ctx.fillStyle = "#f4ede0";
  roundRect(ctx, panelX, panelY, panelW, panelH, 8);
  ctx.fill();
  ctx.strokeStyle = "#b89258";
  ctx.lineWidth = 2;
  roundRect(ctx, panelX + 8, panelY + 8, panelW - 16, panelH - 16, 4);
  ctx.stroke();

  const cx = W / 2;
  const charcoal = "#211e1b";
  const amber = "#a9791f";
  ctx.textAlign = "center";

  const crestBottom = panelY + 152;

  // "Bottled for" eyebrow
  ctx.fillStyle = amber;
  ctx.font = "500 13px Georgia, serif";
  ctx.fillText("B O T T L E D   F O R", cx, crestBottom + 14);

  // The name — the heart of the label
  ctx.fillStyle = charcoal;
  ctx.font = "700 30px Georgia, serif";
  wrapCentered(
    ctx,
    data.name.trim() || "Your Name",
    cx,
    crestBottom + 52,
    panelW * 0.82,
    32
  );

  // Dedication in italic
  ctx.fillStyle = "#4c463d";
  ctx.font = "italic 400 15px Georgia, serif";
  wrapCentered(
    ctx,
    data.dedication.trim() || "A line of dedication, set in your words",
    cx,
    crestBottom + 124,
    panelW * 0.8,
    20
  );

  // Divider
  ctx.strokeStyle = "#b89258";
  ctx.lineWidth = 1;
  line(ctx, cx - panelW * 0.26, crestBottom + 172, cx + panelW * 0.26, crestBottom + 172);

  // Cask + standard
  ctx.fillStyle = charcoal;
  ctx.font = "500 15px Georgia, serif";
  ctx.fillText(data.caskLabel.toUpperCase(), cx, crestBottom + 202);
  ctx.font = "400 13px Georgia, serif";
  ctx.fillText("SINGLE CASK · CASK STRENGTH", cx, crestBottom + 224);
  ctx.font = "400 11px Georgia, serif";
  ctx.fillStyle = amber;
  ctx.fillText("PRESTIGE MALTS · LONDON", cx, crestBottom + 254);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  // House emblem stamped at the top, as on every bottle of the house.
  drawEmblem(ctx, texture, cx, panelY);

  return texture;
}

/**
 * Stamps the house emblem in ink at the top of a label panel, refreshing the
 * texture once the image decodes. The emblem is portrait (1122x1402).
 */
function drawEmblem(
  ctx: CanvasRenderingContext2D,
  texture: THREE.CanvasTexture,
  cx: number,
  panelY: number
) {
  const emblem = new Image();
  emblem.src = "/emblem-ink.png";
  emblem.onload = () => {
    const w = 112;
    const h = (w * 1402) / 1122;
    ctx.drawImage(emblem, cx - w / 2, panelY + 8, w, h);
    texture.needsUpdate = true;
  };
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function line(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function wrapCentered(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  lines.forEach((l, i) => ctx.fillText(l, cx, y + i * lineHeight));
}
