// FakeStore & DummyJSON prices are in US dollars.
// Change this one number to update every price in the app.
export const USD_TO_INR = 85;

export const usdToInr = (usd) => Math.round(usd * USD_TO_INR);

const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

// formatPrice(84999) -> "₹84,999"
export const formatPrice = (inr) => formatter.format(inr);