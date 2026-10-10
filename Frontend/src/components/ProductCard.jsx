import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import Rating from "./Rating";
import ProductImage from "./ProductImage";
import Reveal from "./Reveal";
import { formatPrice } from "../utils/currency";
import { getOffer, mrpFrom, formatPercent } from "../utils/deals";

function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const { offPct } = getOffer(product.id);
  const mrp = mrpFrom(product.price, offPct);

  return (
    <Reveal delay={Math.min(index % 8, 4) * 60}>
      <article className="product-card">
        <div className="media-badges">
          <span className="media-badge offer">{formatPercent(offPct)}</span>
          <span className="media-badge cat">{product.category}</span>
        </div>

        <Link to={`/product/${product.id}`} className="card-media" aria-label={product.title}>
          <ProductImage src={product.image} alt={product.title} />
          <span className="quick-add">
            <button
              className="btn btn-primary btn-sm"
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
            >
              Add to Cart
            </button>
          </span>
        </Link>

        <div className="card-body">
          <h3 className="card-title">
            <Link to={`/product/${product.id}`}>{product.title}</Link>
          </h3>
          <Rating rate={product.rating?.rate} count={product.rating?.count} />

          <div className="card-footer">
            <div className="price-wrap">
              <span className="price">{formatPrice(product.price)}</span>
              <span>
                <span className="price-mrp">{formatPrice(mrp)}</span>{" "}
                <span className="save-pill">{formatPercent(offPct)}</span>
              </span>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default ProductCard;