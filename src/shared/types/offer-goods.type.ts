export const OFFER_GOODS = [
  'Breakfast',
  'Air conditioning',
  'Laptop friendly workspace',
  'Baby seat',
  'Washer',
  'Towels',
  'Fridge'
] as const;

type OfferGood = typeof OFFER_GOODS[number];

export type OfferGoods = Set<OfferGood>;