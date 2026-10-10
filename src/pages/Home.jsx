import { useMemo, useState } from "react";
import { getProducts, getErrorMessage } from "../services/api";
import useAsync from "../hooks/useAsync";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";

const PAGE_SIZE = 12;

const SORTS = {
  default: { label: "Featured", fn: null },
  "price-asc": { label: "Price: Low to High", fn: (a, b) => a.price - b.price },
  "price-desc": { label: "Price: High to Low", fn: (a, b) => b.price - a.price },
  rating: { label: "Top Rated", fn: (a, b) => b.rating.rate - a.rating.rate },
};

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

  // Any filter change goes back to the first page of results
  const onSearch = (v) => { setSearch(v); setShown(PAGE_SIZE); };
  const onCategory = (v) => { setCategory(v); setShown(PAGE_SIZE); };
  const onSort = (v) => { setSort(v); setShown(PAGE_SIZE); };
  const clearFilters = () => { setSearch(""); setCategory("all"); setSort("default"); setShown(PAGE_SIZE); };

  const visible = filtered.slice(0, shown);

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <span className="hero-tag">New season deals</span>
          <h1>Discover products you'll love</h1>
          <p>Fashion, electronics, beauty, home and more — all in one place at ShopEase.</p>
          <a href="#products" className="btn btn-light btn-lg hero-cta">Shop Now →</a>
        </div>
      </section>

      <main className="container section" id="products">
        <div className="section-head">
          <h2>All Products</h2>
          {products && <span className="muted">{filtered.length} items</span>}
        </div>

        {error && <ErrorState message={getErrorMessage(error)} onRetry={retry} />}
        {loading && <Loader />}

        {products && (
          <>
            <div className="toolbar">
              <input
                type="search"
                className="input"
                placeholder="Search products..."
                value={search}
                onChange={(e) => onSearch(e.target.value)}
                aria-label="Search products"
              />
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
                <div className="product-grid">
                  {visible.map((p) => (
                    <ProductCard key={p.id} product={p} />
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