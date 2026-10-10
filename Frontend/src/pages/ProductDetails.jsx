import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct, getErrorMessage } from "../services/api";
import useAsync from "../hooks/useAsync";
import useCart from "../hooks/useCart";
import Rating from "../components/Rating";
import ProductImage from "../components/ProductImage";
import ErrorState from "../components/ErrorState";
import Reveal from "../components/Reveal";
import { formatPrice } from "../utils/currency";
import { getOffer, mrpFrom, formatPercent } from "../utils/deals";

function ProductDetails() {
  const { id } = useParams();
  const { data: product, loading, error, retry } = useAsync(getProduct, id);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const { offPct } = getOffer(product ? product.id : "");
  const mrp = product ? mrpFrom(product.price, offPct) : 0;

  return (
    <main className="container section">
      <Link to="/" className="back-link">Back to products</Link>

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
          <Reveal className="details-media">
            <ProductImage src={product.image} alt={product.title} />
          </Reveal>

          <div className="details-info">
            <Reveal delay={0}>
              <p className="category">{product.category}</p>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="pdp-title">{product.title}</h1>
            </Reveal>
            <Reveal delay={120}>
              <Rating rate={product.rating?.rate} count={product.rating?.count} />
            </Reveal>
            <Reveal delay={180}>
              <p className="details-price">
                {formatPrice(product.price)}
                <span className="mrp">{formatPrice(mrp)}</span>
                <span className="off">{formatPercent(offPct)}</span>
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="details-desc">{product.description}</p>
            </Reveal>

            <Reveal delay={300}>
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
                  Add to Cart — {formatPrice(product.price * qty)}
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      )}
    </main>
  );
}

export default ProductDetails;