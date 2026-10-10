// Deterministic, stable "deals" so the catalogue feels like a real store.

function hashId(id) {
  const str = String(id);
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

// Same product always shows the same offer.
export const getOffer = (id) => {
  const h = hashId(id);
  const offPct = 5 + (h % 24); // 5% – 28%
  return { offPct };
};

// "MRP" someone might see on the tag — sale price = current price.
export const mrpFrom = (price, offPct) => Math.round(price / (1 - offPct / 100));

export const formatPercent = (offPct) => `${offPct}% OFF`;