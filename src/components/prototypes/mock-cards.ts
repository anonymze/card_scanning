// PROTOTYPE — throwaway mock data for sheet variants

export type MockCard = {
  oracle_id: string;
  name: string;
  mana_cost: string | null;
  type_line: string;
  oracle_text: string;
  set_code: string;
  set_name: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'mythic';
  collector_number: string;
  image_normal: string;
  count: number; // pour mocker le badge ×N (passive indicator)
};

export const MOCK_CARDS: MockCard[] = [
  {
    oracle_id: '1',
    name: 'Lightning Bolt',
    mana_cost: '{R}',
    type_line: 'Instant',
    oracle_text: 'Lightning Bolt deals 3 damage to any target.',
    set_code: 'M21',
    set_name: 'Core Set 2021',
    rarity: 'common',
    collector_number: '149/274',
    image_normal: 'https://cards.scryfall.io/normal/front/4/4/4457ed35-7c10-48c8-9776-456485fdf070.jpg',
    count: 3,
  },
  {
    oracle_id: '2',
    name: 'Counterspell',
    mana_cost: '{U}{U}',
    type_line: 'Instant',
    oracle_text: 'Counter target spell.',
    set_code: 'M21',
    set_name: 'Core Set 2021',
    rarity: 'common',
    collector_number: '46/274',
    image_normal: 'https://cards.scryfall.io/normal/front/a/9/a91c0f22-11e9-4c78-a8b1-7c1e4d90fabc.jpg',
    count: 0,
  },
  {
    oracle_id: '3',
    name: 'Giant Growth',
    mana_cost: '{G}',
    type_line: 'Instant',
    oracle_text: 'Target creature gets +3/+3 until end of turn.',
    set_code: 'M21',
    set_name: 'Core Set 2021',
    rarity: 'common',
    collector_number: '174/274',
    image_normal: 'https://cards.scryfall.io/normal/front/b/7/b7f3c1a8-22aa-4f11-83c0-8d2e5e91adef.jpg',
    count: 0,
  },
  {
    oracle_id: '4',
    name: 'Serra Angel',
    mana_cost: '{3}{W}{W}',
    type_line: 'Creature — Angel',
    oracle_text: 'Flying, vigilance.',
    set_code: 'M21',
    set_name: 'Core Set 2021',
    rarity: 'uncommon',
    collector_number: '34/274',
    image_normal: 'https://cards.scryfall.io/normal/front/c/2/c2e1d3f4-33bb-4c22-94d1-9e3f6f02bedc.jpg',
    count: 1,
  },
  {
    oracle_id: '5',
    name: 'Dark Ritual',
    mana_cost: '{B}',
    type_line: 'Instant',
    oracle_text: 'Add {B}{B}{B}.',
    set_code: 'FDN',
    set_name: 'Foundations',
    rarity: 'common',
    collector_number: '101/250',
    image_normal: 'https://cards.scryfall.io/normal/front/d/3/d3f4e5a6-44cc-4d33-a5e2-af4f7f13cfab.jpg',
    count: 4,
  },
  {
    oracle_id: '6',
    name: 'Black Lotus',
    mana_cost: '{0}',
    type_line: 'Artifact',
    oracle_text: '{T}, Sacrifice Black Lotus: Add three mana of any one color.',
    set_code: 'LEA',
    set_name: 'Alpha',
    rarity: 'mythic',
    collector_number: '232/295',
    image_normal: 'https://cards.scryfall.io/normal/front/a/3/a3f5c1d8-99ff-4f00-b0a0-aa11b22c33dd.jpg',
    count: 0,
  },
  {
    oracle_id: '7',
    name: 'Tarmogoyf',
    mana_cost: '{1}{G}',
    type_line: 'Creature — Lhurgoyf',
    oracle_text: "Tarmogoyf's power is equal to the number of card types among cards in all graveyards and its toughness is equal to that number plus 1.",
    set_code: 'FUT',
    set_name: 'Future Sight',
    rarity: 'rare',
    collector_number: '153/180',
    image_normal: 'https://cards.scryfall.io/normal/front/9/8/98765432-1234-5678-9abc-def012345678.jpg',
    count: 2,
  },
  {
    oracle_id: '8',
    name: 'Forest',
    mana_cost: null,
    type_line: 'Basic Land — Forest',
    oracle_text: '{T}: Add {G}.',
    set_code: 'M21',
    set_name: 'Core Set 2021',
    rarity: 'common',
    collector_number: '273/274',
    image_normal: 'https://cards.scryfall.io/normal/front/f/0/f01efb04-ad2b-46fb-852c-dfb7e523e1b7.jpg',
    count: 12,
  },
  {
    oracle_id: '9',
    name: 'Mountain',
    mana_cost: null,
    type_line: 'Basic Land — Mountain',
    oracle_text: '{T}: Add {R}.',
    set_code: 'M21',
    set_name: 'Core Set 2021',
    rarity: 'common',
    collector_number: '272/274',
    image_normal: 'https://cards.scryfall.io/normal/front/m/0/m01efb04-ad2b-46fb-852c-dfb7e523e1b7.jpg',
    count: 0,
  },
  {
    oracle_id: '10',
    name: 'Snapcaster Mage',
    mana_cost: '{1}{U}',
    type_line: 'Creature — Human Wizard',
    oracle_text: 'Flash. When Snapcaster Mage enters the battlefield, target instant or sorcery card in your graveyard gains flashback until end of turn.',
    set_code: 'ISD',
    set_name: 'Innistrad',
    rarity: 'rare',
    collector_number: '78/264',
    image_normal: 'https://cards.scryfall.io/normal/front/s/n/snapcaster.jpg',
    count: 0,
  },
];

