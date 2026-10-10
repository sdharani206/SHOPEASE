import { useMemo, useState } from "react";
import { getProducts, getErrorMessage } from "../services/api";
import useAsync from "../hooks/useAsync";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import Reveal from "../components/Reveal";

const PAGE_SIZE = 12;


const SORTS = {
  default: { label: "Featured", fn: null },
  "price-asc": {
    label: "Price: Low to High",
    fn: (a, b) => a.price - b.price,
  },
  "price-desc": {
    label: "Price: High to Low",
    fn: (a, b) => b.price - a.price,
  },
  rating: {
    label: "Top Rated",
    fn: (a, b) => 0,
  },
};

const BENEFITS = [
  "Free shipping over ₹1,999",
  "7-day easy returns",
  "Secure checkout",
  "COD available",
  "Genuine products",
  "24/7 support",
];

function Home() {
  const { data: products, loading, error, retry } = useAsync(getProducts, "all");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [shown, setShown] = useState(PAGE_SIZE);

  const categories = useMemo(
    () => (products ? ["all", ...new Set(products.map((p) => p.category))] : []),
    [products]
  );

  const filtered = useMemo(() => {
    if (!products) return [];
    const q = search.trim().toLowerCase();
    const list = products.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (!q || p.title.toLowerCase().includes(q))
    );
    const sorter = SORTS[sort].fn;
    return sorter ? [...list].sort(sorter) : list;
  }, [products, search, category, sort]);

  const onSearch = (v) => { setSearch(v); setShown(PAGE_SIZE); };
  const onCategory = (v) => { setCategory(v); setShown(PAGE_SIZE); };
  const onSort = (v) => { setSort(v); setShown(PAGE_SIZE); };
  const clearFilters = () => { setSearch(""); setCategory("all"); setSort("default"); setShown(PAGE_SIZE); };

  const visible = filtered.slice(0, shown);

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <span className="hero-tag"><span className="dot" /> New season deals are live</span>
          <h1>
            Discover products <span className="accent">you'll love</span>
          </h1>
          <p>Fashion, electronics, beauty, home and more — everything you need at prices that make sense.</p>
          <a href="#products" className="btn btn-light btn-lg hero-cta">Shop Now →</a>
          <div className="hero-stats">
            <div className="hero-stat"><b>10k+</b><span>Products</span></div>
            <div className="hero-stat"><b>50k+</b><span>Happy customers</span></div>
            <div className="hero-stat"><b>4.7★</b><span>Average rating</span></div>
          </div>
        </div>
      </section>

      <div className="benefit-bar" aria-hidden="true">
        <div className="benefit-track">
          {[...BENEFITS, ...BENEFITS].map((b, i) => (
            <span key={i}><b>✓</b> {b}</span>
          ))}
        </div>
      </div>

      <main className="container section" id="products">
        <Reveal as="div" className="section-head">
          <h2>All Products</h2>
          {products && <span className="muted">{filtered.length} items</span>}
        </Reveal>

        {error && <ErrorState message={getErrorMessage(error)} onRetry={retry} />}
        {loading && <Loader />}

        {products && (
          <>
            <Reveal>
              <div className="toolbar">
                <div className="search-wrap">
                  <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                    <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <input
                    type="search"
                    className="input"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => onSearch(e.target.value)}
                    aria-label="Search products"
                  />
                </div>
                <select
                  className="input"
                  value={sort}
                  onChange={(e) => onSort(e.target.value)}
                  aria-label="Sort products"
                >
                  {Object.entries(SORTS).map(([key, { label }]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="chips" aria-label="Categories">
                {categories.map((c) => (
                  <button
                    key={c}
                    className={`chip ${category === c ? "active" : ""}`}
                    onClick={() => onCategory(c)}
                  >
                    {c === "all" ? "All" : c}
                  </button>
                ))}
              </div>
            </Reveal>

            {filtered.length === 0 ? (
              <div className="state-box">
                <div className="state-icon">🔍</div>
                <h2>No products found</h2>
                <p>Try a different search or category.</p>
                <button className="btn btn-primary" onClick={clearFilters}>
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                <div className="product-grid" key={`${search}-${category}-${sort}`}>
                  {visible.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </div>

                {shown < filtered.length && (
                  <div className="load-more">
                    <button
                      className="btn btn-outline btn-lg"
                      onClick={() => setShown((n) => n + PAGE_SIZE)}
                    >
                      Show more ({filtered.length - shown} left)
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}

export default Home;