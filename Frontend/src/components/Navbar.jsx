import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useCart from "../hooks/useCart";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCart();
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container navbar-inner">
        <Link to="/" className="brand" onClick={close} aria-label="ShopEase home">
          <span className="brand-mark">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 7h12l-1 13H7L6 7Z" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
              <path d="M9 10V7a3 3 0 0 1 6 0v3" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 7h12l-1 13H7L6 7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <path d="M9 10V7a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Cart
            {count > 0 && <span className="badge" key={count}>{count}</span>}
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