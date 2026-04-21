-- 10 real MTG cards with 2 English printings each.
-- A few also have a French printing + representative_printings 'fr' entry.
-- phash is fake random BLOB (8 bytes) for stub purposes.

BEGIN TRANSACTION;

-- ============================================================================
-- 1. Lightning Bolt
-- ============================================================================
INSERT INTO cards VALUES (
  '4457ed35-7c10-48c8-9776-456485fdf070',
  'Lightning Bolt', '{R}', 1.0, 'Instant',
  'Lightning Bolt deals 3 damage to any target.',
  'R', 'R', NULL, NULL, NULL,
  '[]',
  '{"standard":"not_legal","modern":"legal","legacy":"legal","vintage":"legal","commander":"legal","pioneer":"not_legal","pauper":"legal"}',
  NULL
);
INSERT INTO printings VALUES (
  'c5f52b37-aaaa-0001-0000-000000000001',
  '4457ed35-7c10-48c8-9776-456485fdf070',
  'en', 'lea', 'Limited Edition Alpha', '161', 'common', '1993-08-05', 'Christopher Rush',
  'https://cards.scryfall.io/small/front/c/5/c5f52b37.jpg',
  'https://cards.scryfall.io/normal/front/c/5/c5f52b37.jpg',
  NULL, NULL, NULL,
  8000.00, 7500.00, NULL, NULL,
  1001, 2001, x'A1B2C3D4E5F60718'
);
INSERT INTO printings VALUES (
  'c5f52b37-aaaa-0001-0000-000000000002',
  '4457ed35-7c10-48c8-9776-456485fdf070',
  'en', 'm10', 'Magic 2010', '146', 'common', '2009-07-17', 'Christopher Moeller',
  'https://cards.scryfall.io/small/front/0/0/00000002.jpg',
  'https://cards.scryfall.io/normal/front/0/0/00000002.jpg',
  NULL, NULL, NULL,
  1.50, 1.20, 8.00, 6.00,
  1002, 2002, x'11223344556677FF'
);
INSERT INTO printings VALUES (
  'c5f52b37-aaaa-0001-0000-000000000003',
  '4457ed35-7c10-48c8-9776-456485fdf070',
  'fr', 'm10', 'Magic 2010', '146', 'common', '2009-07-17', 'Christopher Moeller',
  'https://cards.scryfall.io/small/front/0/0/00000003.jpg',
  'https://cards.scryfall.io/normal/front/0/0/00000003.jpg',
  'Éclair', 'L''Éclair inflige 3 blessures à n''importe quelle cible.', 'Éphémère',
  1.80, 1.50, 9.00, 7.00,
  1003, 2003, x'11223344556677FF'
);
INSERT INTO representative_printings VALUES ('4457ed35-7c10-48c8-9776-456485fdf070', 'en', 'c5f52b37-aaaa-0001-0000-000000000002');
INSERT INTO representative_printings VALUES ('4457ed35-7c10-48c8-9776-456485fdf070', 'fr', 'c5f52b37-aaaa-0001-0000-000000000003');

-- ============================================================================
-- 2. Counterspell
-- ============================================================================
INSERT INTO cards VALUES (
  'a91c0f22-11e9-4c78-a8b1-7c1e4d90fabc',
  'Counterspell', '{U}{U}', 2.0, 'Instant',
  'Counter target spell.',
  'U', 'U', NULL, NULL, NULL,
  '[]',
  '{"standard":"not_legal","modern":"legal","legacy":"legal","vintage":"legal","commander":"legal","pauper":"legal"}',
  NULL
);
INSERT INTO printings VALUES (
  'd1e2f3a4-bbbb-0002-0000-000000000001',
  'a91c0f22-11e9-4c78-a8b1-7c1e4d90fabc',
  'en', 'lea', 'Limited Edition Alpha', '055', 'uncommon', '1993-08-05', 'Mark Poole',
  'https://cards.scryfall.io/small/front/d/1/d1000001.jpg',
  'https://cards.scryfall.io/normal/front/d/1/d1000001.jpg',
  NULL, NULL, NULL,
  180.00, 150.00, NULL, NULL,
  3001, 4001, x'BEEF1234CAFEBABE'
);
INSERT INTO printings VALUES (
  'd1e2f3a4-bbbb-0002-0000-000000000002',
  'a91c0f22-11e9-4c78-a8b1-7c1e4d90fabc',
  'en', 'mh2', 'Modern Horizons 2', '267', 'uncommon', '2021-06-18', 'Ryan Pancoast',
  'https://cards.scryfall.io/small/front/d/1/d1000002.jpg',
  'https://cards.scryfall.io/normal/front/d/1/d1000002.jpg',
  NULL, NULL, NULL,
  2.50, 2.00, 10.00, 8.00,
  3002, 4002, x'DEADBEEF12345678'
);
INSERT INTO representative_printings VALUES ('a91c0f22-11e9-4c78-a8b1-7c1e4d90fabc', 'en', 'd1e2f3a4-bbbb-0002-0000-000000000002');

-- ============================================================================
-- 3. Giant Growth
-- ============================================================================
INSERT INTO cards VALUES (
  'b7f3c1a8-22aa-4f11-83c0-8d2e5e91adef',
  'Giant Growth', '{G}', 1.0, 'Instant',
  'Target creature gets +3/+3 until end of turn.',
  'G', 'G', NULL, NULL, NULL,
  '[]',
  '{"standard":"not_legal","modern":"legal","legacy":"legal","vintage":"legal","commander":"legal","pauper":"legal"}',
  NULL
);
INSERT INTO printings VALUES (
  'e1f2a3b4-cccc-0003-0000-000000000001',
  'b7f3c1a8-22aa-4f11-83c0-8d2e5e91adef',
  'en', 'lea', 'Limited Edition Alpha', '205', 'common', '1993-08-05', 'Sandra Everingham',
  'https://cards.scryfall.io/small/front/e/1/e1000001.jpg',
  'https://cards.scryfall.io/normal/front/e/1/e1000001.jpg',
  NULL, NULL, NULL,
  45.00, 38.00, NULL, NULL,
  5001, 6001, x'0102030405060708'
);
INSERT INTO printings VALUES (
  'e1f2a3b4-cccc-0003-0000-000000000002',
  'b7f3c1a8-22aa-4f11-83c0-8d2e5e91adef',
  'fr', 'm15', 'Magic 2015', '177', 'common', '2014-07-18', 'Raymond Swanland',
  'https://cards.scryfall.io/small/front/e/1/e1000002.jpg',
  'https://cards.scryfall.io/normal/front/e/1/e1000002.jpg',
  'Croissance gigantesque', 'La créature ciblée gagne +3/+3 jusqu''à la fin du tour.', 'Éphémère',
  0.25, 0.20, 1.00, 0.80,
  5002, 6002, x'0A0B0C0D0E0F1011'
);
INSERT INTO representative_printings VALUES ('b7f3c1a8-22aa-4f11-83c0-8d2e5e91adef', 'en', 'e1f2a3b4-cccc-0003-0000-000000000001');
INSERT INTO representative_printings VALUES ('b7f3c1a8-22aa-4f11-83c0-8d2e5e91adef', 'fr', 'e1f2a3b4-cccc-0003-0000-000000000002');

-- ============================================================================
-- 4. Serra Angel
-- ============================================================================
INSERT INTO cards VALUES (
  'c2e1d3f4-33bb-4c22-94d1-9e3f6f02bedc',
  'Serra Angel', '{3}{W}{W}', 5.0, 'Creature — Angel',
  'Flying, vigilance',
  'W', 'W', '4', '4', NULL,
  '["Flying","Vigilance"]',
  '{"standard":"not_legal","modern":"legal","legacy":"legal","vintage":"legal","commander":"legal"}',
  NULL
);
INSERT INTO printings VALUES (
  'f1a2b3c4-dddd-0004-0000-000000000001',
  'c2e1d3f4-33bb-4c22-94d1-9e3f6f02bedc',
  'en', 'lea', 'Limited Edition Alpha', '035', 'uncommon', '1993-08-05', 'Douglas Shuler',
  'https://cards.scryfall.io/small/front/f/1/f1000001.jpg',
  'https://cards.scryfall.io/normal/front/f/1/f1000001.jpg',
  NULL, NULL, NULL,
  220.00, 180.00, NULL, NULL,
  7001, 8001, x'FEDCBA9876543210'
);
INSERT INTO printings VALUES (
  'f1a2b3c4-dddd-0004-0000-000000000002',
  'c2e1d3f4-33bb-4c22-94d1-9e3f6f02bedc',
  'en', 'm15', 'Magic 2015', '026', 'uncommon', '2014-07-18', 'Greg Staples',
  'https://cards.scryfall.io/small/front/f/1/f1000002.jpg',
  'https://cards.scryfall.io/normal/front/f/1/f1000002.jpg',
  NULL, NULL, NULL,
  0.50, 0.40, 2.00, 1.60,
  7002, 8002, x'BAADF00DCAFEBABE'
);
INSERT INTO representative_printings VALUES ('c2e1d3f4-33bb-4c22-94d1-9e3f6f02bedc', 'en', 'f1a2b3c4-dddd-0004-0000-000000000002');

-- ============================================================================
-- 5. Dark Ritual
-- ============================================================================
INSERT INTO cards VALUES (
  'd3f4e5a6-44cc-4d33-a5e2-af4f7f13cfab',
  'Dark Ritual', '{B}', 1.0, 'Instant',
  'Add {B}{B}{B}.',
  'B', 'B', NULL, NULL, NULL,
  '[]',
  '{"standard":"not_legal","modern":"not_legal","legacy":"legal","vintage":"legal","commander":"legal","pauper":"legal"}',
  NULL
);
INSERT INTO printings VALUES (
  'a1b2c3d4-eeee-0005-0000-000000000001',
  'd3f4e5a6-44cc-4d33-a5e2-af4f7f13cfab',
  'en', 'lea', 'Limited Edition Alpha', '093', 'common', '1993-08-05', 'Sandra Everingham',
  'https://cards.scryfall.io/small/front/a/1/a1000001.jpg',
  'https://cards.scryfall.io/normal/front/a/1/a1000001.jpg',
  NULL, NULL, NULL,
  75.00, 60.00, NULL, NULL,
  9001, 10001, x'1111222233334444'
);
INSERT INTO printings VALUES (
  'a1b2c3d4-eeee-0005-0000-000000000002',
  'd3f4e5a6-44cc-4d33-a5e2-af4f7f13cfab',
  'en', 'ema', 'Eternal Masters', '085', 'common', '2016-06-10', 'Dan Frazier',
  'https://cards.scryfall.io/small/front/a/1/a1000002.jpg',
  'https://cards.scryfall.io/normal/front/a/1/a1000002.jpg',
  NULL, NULL, NULL,
  4.00, 3.50, 15.00, 12.00,
  9002, 10002, x'5555666677778888'
);
INSERT INTO representative_printings VALUES ('d3f4e5a6-44cc-4d33-a5e2-af4f7f13cfab', 'en', 'a1b2c3d4-eeee-0005-0000-000000000002');

-- ============================================================================
-- 6. Birds of Paradise
-- ============================================================================
INSERT INTO cards VALUES (
  'e4a5b6c7-55dd-4e44-b6f3-b05f8f24dfbc',
  'Birds of Paradise', '{G}', 1.0, 'Creature — Bird',
  'Flying\n{T}: Add one mana of any color.',
  'G', 'G', '0', '1', NULL,
  '["Flying"]',
  '{"standard":"not_legal","modern":"legal","legacy":"legal","vintage":"legal","commander":"legal"}',
  NULL
);
INSERT INTO printings VALUES (
  'b2c3d4e5-ffff-0006-0000-000000000001',
  'e4a5b6c7-55dd-4e44-b6f3-b05f8f24dfbc',
  'en', 'lea', 'Limited Edition Alpha', '170', 'rare', '1993-08-05', 'Mark Poole',
  'https://cards.scryfall.io/small/front/b/2/b2000001.jpg',
  'https://cards.scryfall.io/normal/front/b/2/b2000001.jpg',
  NULL, NULL, NULL,
  650.00, 550.00, NULL, NULL,
  11001, 12001, x'AAAABBBBCCCCDDDD'
);
INSERT INTO printings VALUES (
  'b2c3d4e5-ffff-0006-0000-000000000002',
  'e4a5b6c7-55dd-4e44-b6f3-b05f8f24dfbc',
  'en', 'rvr', 'Ravnica Remastered', '162', 'rare', '2024-01-12', 'Marcelo Vignali',
  'https://cards.scryfall.io/small/front/b/2/b2000002.jpg',
  'https://cards.scryfall.io/normal/front/b/2/b2000002.jpg',
  NULL, NULL, NULL,
  6.50, 5.80, 18.00, 15.00,
  11002, 12002, x'0000111122223333'
);
INSERT INTO representative_printings VALUES ('e4a5b6c7-55dd-4e44-b6f3-b05f8f24dfbc', 'en', 'b2c3d4e5-ffff-0006-0000-000000000002');

-- ============================================================================
-- 7. Sol Ring
-- ============================================================================
INSERT INTO cards VALUES (
  'f5b6c7d8-66ee-4f55-c7a4-c16f9f35ebcd',
  'Sol Ring', '{1}', 1.0, 'Artifact',
  '{T}: Add {C}{C}.',
  '', '', NULL, NULL, NULL,
  '[]',
  '{"standard":"not_legal","modern":"not_legal","legacy":"banned","vintage":"restricted","commander":"legal"}',
  NULL
);
INSERT INTO printings VALUES (
  'c3d4e5f6-aaaa-0007-0000-000000000001',
  'f5b6c7d8-66ee-4f55-c7a4-c16f9f35ebcd',
  'en', 'lea', 'Limited Edition Alpha', '259', 'uncommon', '1993-08-05', 'Mark Tedin',
  'https://cards.scryfall.io/small/front/c/3/c3000001.jpg',
  'https://cards.scryfall.io/normal/front/c/3/c3000001.jpg',
  NULL, NULL, NULL,
  3200.00, 2700.00, NULL, NULL,
  13001, 14001, x'9999888877776666'
);
INSERT INTO printings VALUES (
  'c3d4e5f6-aaaa-0007-0000-000000000002',
  'f5b6c7d8-66ee-4f55-c7a4-c16f9f35ebcd',
  'en', 'cmm', 'Commander Masters', '446', 'uncommon', '2023-08-04', 'Mike Bierek',
  'https://cards.scryfall.io/small/front/c/3/c3000002.jpg',
  'https://cards.scryfall.io/normal/front/c/3/c3000002.jpg',
  NULL, NULL, NULL,
  1.20, 1.00, 3.50, 2.80,
  13002, 14002, x'4444555566667777'
);
INSERT INTO representative_printings VALUES ('f5b6c7d8-66ee-4f55-c7a4-c16f9f35ebcd', 'en', 'c3d4e5f6-aaaa-0007-0000-000000000002');

-- ============================================================================
-- 8. Black Lotus
-- ============================================================================
INSERT INTO cards VALUES (
  'a6c7d8e9-77ff-4066-d8b5-d27faf46fcde',
  'Black Lotus', '{0}', 0.0, 'Artifact',
  '{T}, Sacrifice Black Lotus: Add three mana of any one color.',
  '', '', NULL, NULL, NULL,
  '[]',
  '{"standard":"not_legal","modern":"not_legal","legacy":"banned","vintage":"restricted","commander":"banned"}',
  NULL
);
INSERT INTO printings VALUES (
  'd4e5f6a7-bbbb-0008-0000-000000000001',
  'a6c7d8e9-77ff-4066-d8b5-d27faf46fcde',
  'en', 'lea', 'Limited Edition Alpha', '232', 'rare', '1993-08-05', 'Christopher Rush',
  'https://cards.scryfall.io/small/front/d/4/d4000001.jpg',
  'https://cards.scryfall.io/normal/front/d/4/d4000001.jpg',
  NULL, NULL, NULL,
  85000.00, 72000.00, NULL, NULL,
  15001, 16001, x'0F0E0D0C0B0A0908'
);
INSERT INTO printings VALUES (
  'd4e5f6a7-bbbb-0008-0000-000000000002',
  'a6c7d8e9-77ff-4066-d8b5-d27faf46fcde',
  'en', '3ed', 'Revised Edition', '232', 'rare', '1994-04-01', 'Christopher Rush',
  'https://cards.scryfall.io/small/front/d/4/d4000002.jpg',
  'https://cards.scryfall.io/normal/front/d/4/d4000002.jpg',
  NULL, NULL, NULL,
  7500.00, 6500.00, NULL, NULL,
  15002, 16002, x'FEDCBA0987654321'
);
INSERT INTO representative_printings VALUES ('a6c7d8e9-77ff-4066-d8b5-d27faf46fcde', 'en', 'd4e5f6a7-bbbb-0008-0000-000000000001');

-- ============================================================================
-- 9. Jace, the Mind Sculptor
-- ============================================================================
INSERT INTO cards VALUES (
  'b7d8e9f0-8800-4177-e9c6-e38fbf57fde0',
  'Jace, the Mind Sculptor', '{2}{U}{U}', 4.0, 'Legendary Planeswalker — Jace',
  '+2: Look at the top card of target player''s library. You may put that card on the bottom of that player''s library.\n0: Draw three cards, then put two cards from your hand on top of your library in any order.\n-1: Return target creature to its owner''s hand.\n-12: Exile all cards from target player''s library, then that player shuffles their hand into their library.',
  'U', 'U', NULL, NULL, '3',
  '[]',
  '{"standard":"not_legal","modern":"legal","legacy":"legal","vintage":"legal","commander":"legal"}',
  NULL
);
INSERT INTO printings VALUES (
  'e5f6a7b8-cccc-0009-0000-000000000001',
  'b7d8e9f0-8800-4177-e9c6-e38fbf57fde0',
  'en', 'wwk', 'Worldwake', '031', 'mythic', '2010-02-05', 'Jason Chan',
  'https://cards.scryfall.io/small/front/e/5/e5000001.jpg',
  'https://cards.scryfall.io/normal/front/e/5/e5000001.jpg',
  NULL, NULL, NULL,
  110.00, 95.00, NULL, NULL,
  17001, 18001, x'7070707070707070'
);
INSERT INTO printings VALUES (
  'e5f6a7b8-cccc-0009-0000-000000000002',
  'b7d8e9f0-8800-4177-e9c6-e38fbf57fde0',
  'fr', 'ema', 'Eternal Masters', '060', 'mythic', '2016-06-10', 'Jason Chan',
  'https://cards.scryfall.io/small/front/e/5/e5000002.jpg',
  'https://cards.scryfall.io/normal/front/e/5/e5000002.jpg',
  'Jace, le sculpteur de l''esprit', 'Jason Chan translated text placeholder', 'Planeswalker légendaire — Jace',
  95.00, 82.00, 350.00, 300.00,
  17002, 18002, x'8080808080808080'
);
INSERT INTO representative_printings VALUES ('b7d8e9f0-8800-4177-e9c6-e38fbf57fde0', 'en', 'e5f6a7b8-cccc-0009-0000-000000000001');
INSERT INTO representative_printings VALUES ('b7d8e9f0-8800-4177-e9c6-e38fbf57fde0', 'fr', 'e5f6a7b8-cccc-0009-0000-000000000002');

-- ============================================================================
-- 10. Tarmogoyf
-- ============================================================================
INSERT INTO cards VALUES (
  'c8e9f0a1-9911-4288-f0d7-f49fcf68adf1',
  'Tarmogoyf', '{1}{G}', 2.0, 'Creature — Lhurgoyf',
  'Tarmogoyf''s power is equal to the number of card types among cards in all graveyards and its toughness is equal to that number plus 1.',
  'G', 'G', '*', '1+*', NULL,
  '[]',
  '{"standard":"not_legal","modern":"legal","legacy":"legal","vintage":"legal","commander":"legal"}',
  NULL
);
INSERT INTO printings VALUES (
  'f6a7b8c9-dddd-0010-0000-000000000001',
  'c8e9f0a1-9911-4288-f0d7-f49fcf68adf1',
  'en', 'fut', 'Future Sight', '153', 'rare', '2007-05-04', 'Justin Murray',
  'https://cards.scryfall.io/small/front/f/6/f6000001.jpg',
  'https://cards.scryfall.io/normal/front/f/6/f6000001.jpg',
  NULL, NULL, NULL,
  80.00, 70.00, NULL, NULL,
  19001, 20001, x'A0A0A0A0A0A0A0A0'
);
INSERT INTO printings VALUES (
  'f6a7b8c9-dddd-0010-0000-000000000002',
  'c8e9f0a1-9911-4288-f0d7-f49fcf68adf1',
  'en', 'mh2', 'Modern Horizons 2', '165', 'rare', '2021-06-18', 'Justin Murray',
  'https://cards.scryfall.io/small/front/f/6/f6000002.jpg',
  'https://cards.scryfall.io/normal/front/f/6/f6000002.jpg',
  NULL, NULL, NULL,
  30.00, 26.00, 90.00, 80.00,
  19002, 20002, x'B0B0B0B0B0B0B0B0'
);
INSERT INTO representative_printings VALUES ('c8e9f0a1-9911-4288-f0d7-f49fcf68adf1', 'en', 'f6a7b8c9-dddd-0010-0000-000000000002');

COMMIT;
