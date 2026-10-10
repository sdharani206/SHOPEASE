import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct, getErrorMessage } from "../services/api";
import useAsync from "../hooks/useAsync";
import useCart from "../hooks/useCart";
import Rating from "../components/Rating";
import ProductImage from "../components/ProductImage";
import ErrorState from "../components/ErrorState";
import { formatPrice } from "../utils/currency";

function ProductDetails() {
  const { id } = useParams();
  const { data: product, loading, error, retry } = useAsync(getProduct, id);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <main className="container section">
      <Link to="/" className="back-link">← Back to products</Link>

      {loading && (
        <div className="details" aria-busy="true">
          <div className="details-media skeleton" />
          <div className="details-info">
            <div className="skeleton line short" />
            <div className="skeleton line" />
            <div className="skeleton line" />
            <div className="skeleton line" />
          </div>
        </div>
      )}

      {error && <ErrorState message={getErrorMessage(error)} onRetry={retry} />}

      {product && (
        <div className="details">
          <div className="details-media">
            <ProductImage src={product.image} alt={product.title} />
          </div>

          <div className="details-info">
            <p className="category">{product.category}</p>
            <h1>{product.title}</h1>
            <Rating rate={product.rating?.rate} count={product.rating?.count} />
            <p className="details-price">{formatPrice(product.price)}</p>
            <p className="details-desc">{product.description}</p>

            <div className="buy-row">
              <div className="qty">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
                <span>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">+</button>
              </div>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => addToCart(product, qty)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default ProductDetails;