import { useState } from "react";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import ProductImage from "../components/ProductImage";
import { formatPrice } from "../utils/currency";

const FREE_SHIPPING_OVER = 1999;
const SHIPPING_FEE = 99;

function Cart() {
  const { items, subtotal, setQty, removeFromCart, clearCart } = useCart();
  const [ordered, setOrdered] = useState(false);

  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  const placeOrder = () => {
    clearCart();
    setOrdered(true);
  };

  if (ordered) {
    return (
      <main className="container section">
        <div className="state-box">
          <div className="state-icon">🎉</div>
          <h2>Order placed!</h2>
          <p>Thank you for shopping with ShopEase. (This is a demo checkout.)</p>
          <Link to="/" className="btn btn-primary">Continue shopping</Link>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="container section">
        <div className="state-box">
          <div className="state-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet.</p>
          <Link to="/" className="btn btn-primary">Browse products</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container section">
      <div className="section-head">
        <h2>Shopping Cart</h2>
        <button className="link-btn" onClick={clearCart}>Clear cart</button>
      </div>

      <div className="cart-layout">
        <ul className="cart-list">
          {items.map((item) => (
            <li className="cart-item" key={item.id}>
              <Link to={`/product/${item.id}`} className="cart-thumb">
                <ProductImage src={item.image} alt={item.title} />
              </Link>

              <div className="cart-info">
                <Link to={`/product/${item.id}`} className="cart-title">{item.title}</Link>
                <p className="category">{item.category}</p>
                <p className="muted">{formatPrice(item.price)} each</p>
              </div>

              <div className="cart-actions">
                <div className="qty">
                  <button onClick={() => setQty(item.id, item.qty - 1)} disabled={item.qty <= 1} aria-label="Decrease quantity">−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => setQty(item.id, item.qty + 1)} aria-label="Increase quantity">+</button>
                </div>
                <strong className="line-total">{formatPrice(item.price * item.qty)}</strong>
                <button className="link-btn danger" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>

        <aside className="summary">
          <h3>Order Summary</h3>
          <div className="summary-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
          </div>
          {shipping > 0 && (
            <p className="muted small">
              Add {formatPrice(FREE_SHIPPING_OVER - subtotal)} more for free shipping.
            </p>
          )}
          <div className="summary-row total"><span>Total</span><span>{formatPrice(total)}</span></div>
          <button className="btn btn-primary btn-block" onClick={placeOrder}>Checkout</button>
          <Link to="/" className="btn btn-outline btn-block">Continue shopping</Link>
        </aside>
      </div>
    </main>
  );
}

export default Cart;