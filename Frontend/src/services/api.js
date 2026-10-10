
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export async function getProducts() {
  const response = await api.get("/products");

  // Convert database fields to the format used by your existing UI.
  return response.data.map((product) => ({
    ...product,
    title: product.name,
    image: product.image_url,
    rating: { rate: 0, count: 0 },
  }));
}

export async function getProduct(id) {
  const response = await api.get(`/products/${id}`);
  const product = response.data;

  return {
    ...product,
    title: product.name,
    image: product.image_url,
    rating: { rate: 0, count: 0 },
  };
}

export function getErrorMessage(error) {
  return (
    error.response?.data?.message ||
    error.message ||
    "Something went wrong. Please try again."
  );
}

export default api;