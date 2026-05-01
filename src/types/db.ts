export interface DbVersion {
  version: string;
  url: string;
  sha256: string;
  size: number;
}

export interface CardSearchRow {
  oracle_id: string;
  display_name: string;
  display_type: string | null;
  mana_cost: string | null;
  image_small: string;
}
