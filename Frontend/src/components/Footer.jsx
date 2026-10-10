import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <span className="brand-mark">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 7h12l-1 13H7L6 7Z" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M9 10V7a3 3 0 0 1 6 0v3" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              ShopEase
            </div>
            <p>
              Discover great products at great prices — fashion, electronics,
              beauty and home goods delivered to your door.
            </p>
          </div>

          <div className="footer-col">
            <h4>Shop</h4>
            <ul>
              <li><Link to="/">All products</Link></li>
              <li><Link to="/#products">Deals</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#products">About</a></li>
              <li><a href="#products">Returns</a></li>
              <li><a href="#products">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          © {year} ShopEase. Product data by FakeStore API &amp; DummyJSON. Prices in ₹.
        </div>
      </div>
    </footer>
  );
}

export default Footer;