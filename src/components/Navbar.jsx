import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useCart from "../hooks/useCart";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const close = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand" onClick={close}>
          <span className="brand-mark">S</span>
          ShopEase
        </Link>

        <button
          className="menu-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`burger ${open ? "open" : ""}`} />
        </button>

        <nav className={`nav-links ${open ? "show" : ""}`}>
          <NavLink to="/" end onClick={close}>Home</NavLink>
          <NavLink to="/cart" onClick={close} className="cart-link">
            Cart
            {count > 0 && <span className="badge">{count}</span>}
          </NavLink>
          <Link to="/#products" onClick={close} className="nav-cta">
            Shop Now
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;