import type { Distillery } from "./types";
import { products } from "./products";

/**
 * Editorial distillery profiles. Founding dates are historical; summaries and
 * character lines are house copy — review before launch. In production this
 * moves to the CMS alongside products.
 */
export const distilleries: Distillery[] = [
  {
    id: "clynelish",
    name: "Clynelish",
    region: "Highland",
    founded: 1819,
    summary:
      "Raised above the fishing town of Brora on the Sutherland coast, Clynelish is the connoisseur's Highland malt — long the backbone of great blends, and jealously guarded by those who bottle it alone.",
    character:
      "Waxy, coastal, honeyed — a texture no other distillery can imitate.",
  },
  {
    id: "springbank",
    name: "Springbank",
    region: "Campbeltown",
    founded: 1828,
    summary:
      "The last of the great Campbeltown houses still malting, distilling, maturing and bottling on one site, in family hands since the beginning. Production is tiny; devotion is not.",
    character:
      "Oily, saline, quietly smoky — whisky made the way it was in 1828.",
  },
  {
    id: "glenfarclas",
    name: "Glenfarclas",
    region: "Speyside",
    founded: 1836,
    summary:
      "Six generations of the Grant family have run Glenfarclas without interruption, filling stout sherry butts and letting Speyside spirit take its time. The old warehouses hold some of Scotland's deepest stocks.",
    character: "Sherried depth — Christmas cake, old leather, patient oak.",
  },
  {
    id: "caol-ila",
    name: "Caol Ila",
    region: "Islay",
    founded: 1846,
    summary:
      "Set in a cove on the Sound of Islay with the Paps of Jura across the water, Caol Ila makes the island's most elegant smoke — maritime, precise, and beloved by blenders and bottlers alike.",
    character: "Coastal smoke, lemon oil, sea spray — Islay in a fine line.",
  },
  {
    id: "glenrothes",
    name: "Glenrothes",
    region: "Speyside",
    founded: 1878,
    summary:
      "In the burgh of Rothes, this distillery quietly produces some of Speyside's most refined spirit — orchard-bright, silky, and a favourite of ours for first-fill bourbon maturation.",
    character: "Orchard fruit, vanilla pod, honeysuckle restraint.",
  },
  {
    id: "ben-nevis",
    name: "Ben Nevis",
    region: "Highland",
    founded: 1825,
    summary:
      "At the foot of Britain's highest mountain, Ben Nevis distils a muscular, old-fashioned Highland spirit — thick, fruity and characterful, superb in sherry and dessert-wine wood.",
    character: "Dark fruit and muscle — a Highland spirit with shoulders.",
  },
  {
    id: "auchentoshan",
    name: "Auchentoshan",
    region: "Lowland",
    founded: 1823,
    summary:
      "Glasgow's triple-distilled Lowlander, producing a spirit of unusual delicacy that takes ambitious cask finishes with uncommon grace.",
    character: "Triple-distilled silk — delicate, fruited, refined.",
  },
  {
    id: "arran",
    name: "Arran",
    region: "Island",
    founded: 1995,
    summary:
      "The youngest house in our cellar and proof that great whisky need not be old whisky — clean island spirit, confident oak, and a distillery already collecting devotees.",
    character: "Bright, spiced, immediately generous.",
  },
];

/** Bottlings currently in the cellar for a given distillery. */
export function bottlingsFor(distilleryName: string) {
  return products.filter((p) => p.distillery === distilleryName);
}
