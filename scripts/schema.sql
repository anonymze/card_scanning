PRAGMA foreign_keys = ON;

CREATE TABLE cards (
  oracle_id      TEXT PRIMARY KEY,
  name           TEXT NOT NULL,
  mana_cost      TEXT,
  cmc            REAL,
  type_line      TEXT,
  oracle_text    TEXT,
  colors         TEXT,
  color_identity TEXT,
  power          TEXT,
  toughness      TEXT,
  loyalty        TEXT,
  keywords       TEXT,
  legalities     TEXT,
  card_faces     TEXT
);

CREATE TABLE printings (
  id                TEXT PRIMARY KEY,
  oracle_id         TEXT NOT NULL REFERENCES cards(oracle_id),
  lang              TEXT NOT NULL,
  set_code          TEXT NOT NULL,
  set_name          TEXT NOT NULL,
  collector_number  TEXT NOT NULL,
  rarity            TEXT NOT NULL,
  released_at       TEXT NOT NULL,
  artist            TEXT,
  image_small       TEXT NOT NULL,
  image_normal      TEXT NOT NULL,
  printed_name      TEXT,
  printed_text      TEXT,
  printed_type_line TEXT,
  price_usd         REAL,
  price_eur         REAL,
  price_usd_foil    REAL,
  price_eur_foil    REAL,
  tcgplayer_id      INTEGER,
  cardmarket_id     INTEGER,
  illustration_id   TEXT,
  phash             TEXT
);

CREATE INDEX idx_printings_oracle ON printings(oracle_id);
CREATE INDEX idx_printings_lang ON printings(lang);
CREATE INDEX idx_printings_phash ON printings(phash);

CREATE TABLE representative_printings (
  oracle_id    TEXT NOT NULL REFERENCES cards(oracle_id),
  lang         TEXT NOT NULL,
  printing_id  TEXT NOT NULL REFERENCES printings(id),
  PRIMARY KEY (oracle_id, lang)
);
CREATE INDEX idx_rep_lang ON representative_printings(lang);

CREATE VIRTUAL TABLE cards_fts USING fts5(
  name, oracle_text, type_line,
  content='cards', content_rowid='rowid'
);

CREATE TRIGGER cards_ai AFTER INSERT ON cards BEGIN
  INSERT INTO cards_fts(rowid, name, oracle_text, type_line)
  VALUES (new.rowid, new.name, new.oracle_text, new.type_line);
END;
