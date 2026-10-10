import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import Rating from "./Rating";
import ProductImage from "./ProductImage";
import { formatPrice } from "../utils/currency";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="card-media">
        <ProductImage src={product.image} alt={product.title} />
      </Link>

      <div className="card-body">
        <p className="category">{product.category}</p>
        <h3 className="card-title">
          <Link to={`/product/${product.id}`}>{product.title}</Link>
        </h3>
        <Rating rate={product.rating?.rate} count={product.rating?.count} />

        <div className="card-footer">
          <span className="price">{formatPrice(product.price)}</span>
          <button className="btn btn-primary btn-sm" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;