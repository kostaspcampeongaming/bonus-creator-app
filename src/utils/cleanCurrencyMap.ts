export function cleanCurrencyMap(map: Record<string, any> = {}): Record<string, number> {
  const cleaned: Record<string, number> = {};
  console.log("🧽 Cleaning input:", map);

  for (const [currency, value] of Object.entries(map)) {
    if (value === '' || value == null) continue;
    const parsed = typeof value === 'string' ? parseFloat(value) : value;
    if (!isNaN(parsed)) {
      cleaned[currency] = parsed;
    }
  }

  console.log("✅ Cleaned output:", cleaned);
  return cleaned;
}
