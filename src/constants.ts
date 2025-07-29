export const currencies = [
  'EUR', 'USD', 'CAD', 'AUD', 'NZD',
  'PLN', 'NGN', 'BRL', 'GBP', 'NOK'
] as const;

export type CurrencyCode = typeof currencies[number];
