/** Core domain types for Prestige Malts. */

export type Region =
  | "Speyside"
  | "Islay"
  | "Highland"
  | "Lowland"
  | "Campbeltown"
  | "Island";

export type CaskType =
  | "First-Fill Bourbon"
  | "Refill Bourbon"
  | "Oloroso Sherry"
  | "Pedro Ximénez"
  | "Virgin Oak"
  | "Port Pipe"
  | "Madeira";

export interface Product {
  /** URL slug / stable id */
  id: string;
  name: string;
  distillery: string;
  region: Region;
  /** Age in years; null for a vintage-only, no-age-statement release */
  age: number | null;
  vintage: number;
  caskNumber: string;
  caskType: CaskType;
  abv: number;
  sizeMl: number;
  /** Total bottles produced from the cask */
  outturn: number;
  bottlesRemaining: number;
  price: number;
  currency: "GBP";
  /**
   * Hex colour of the liquid, feeds the 3D BottleViewer and the 2D fallback.
   * Pale straw -> deep amber -> sherried mahogany.
   */
  liquidColor: string;
  tastingNotes: {
    nose: string;
    palate: string;
    finish: string;
  };
  description: string;
  isLimited: boolean;
  /** Allocated releases are shown to members only / by allocation */
  isAllocated: boolean;
}

export interface Distillery {
  id: string;
  name: string;
  region: Region;
  founded: number;
  summary: string;
  character: string;
}
