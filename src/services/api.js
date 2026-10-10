import axios from "axios";
import { usdToInr } from "../utils/currency";

const TIMEOUT = 10000; // fail after 10s instead of hanging forever

const fakeStore = axios.create({ baseURL: "https://fakestoreapi.com", timeout: TIMEOUT });
const dummyJson = axios.create({ baseURL: "https://dummyjson.com", timeout: TIMEOUT });

/* ---------- Normalizers: make both APIs return the same product shape ---------- */

const fromFakeStore = (p) => ({
  id: `fs-${p.id}`,
  title: p.title,
  description: p.description,
  category: p.category,
  price: usdToInr(p.price),
  image: p.image,
  rating: { rate: p.rating?.rate ?? 0, count: p.rating?.count ?? 0 },
});

const fromDummyJson = (p) => ({
  id: `dj-${p.id}`,
  title: p.title,
  description: p.description,
  category: String(p.category).replace(/-/g, " "),
  price: usdToInr(p.price),
  image: p.thumbnail ?? p.images?.[0],
  rating: {
    rate: Math.round((p.rating ?? 0) * 10) / 10,
    count: p.reviews?.length ?? 0,
  },
});

/* ---------- API calls (all accept an AbortSignal for cancellation) ---------- */

// Loads both stores in parallel. If one is down, the other still works.
export const getProducts = async (_arg, signal) => {
  const [fs, dj] = await Promise.allSettled([
    fakeStore.get("/products", { signal }),
    dummyJson.get("/products", { params: { limit: 60 }, signal }),
  ]);

  const products = [
    ...(fs.status === "fulfilled" ? fs.value.data.map(fromFakeStore) : []),
    ...(dj.status === "fulfilled" ? dj.value.data.products.map(fromDummyJson) : []),
  ];

  if (products.length === 0) throw fs.reason ?? dj.reason;
  return products;
};

// ids look like "fs-3" (FakeStore) or "dj-12" (DummyJSON)
export const getProduct = async (id, signal) => {
  const [source, rawId] = String(id).split("-");

  if (source === "fs") {
    const { data } = await fakeStore.get(`/products/${rawId}`, { signal });
    return fromFakeStore(data);
  }
  if (source === "dj") {
    const { data } = await dummyJson.get(`/products/${rawId}`, { signal });
    return fromDummyJson(data);
  }

  const error = new Error("Unknown product");
  error.response = { status: 404 };
  throw error;
};

// Turn any axios failure into a friendly message
export function getErrorMessage(error) {
  if (error?.code === "ECONNABORTED") {
    return "The request timed out. Please check your connection and try again.";
  }
  if (error?.response) {
    if (error.response.status === 404) return "We couldn't find what you were looking for.";
    return "The store server had a problem. Please try again in a moment.";
  }
  if (error?.request) {
    return "Can't reach the store. Please check your internet connection.";
  }
  return "Something went wrong. Please try again.";
}