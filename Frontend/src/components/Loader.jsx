// Skeleton placeholders shown while products load
function Loader({ count = 8 }) {
  return (
    <div className="product-grid" aria-busy="true" aria-label="Loading products">
      {Array.from({ length: count }).map((_, i) => (
        <div className="product-card skeleton-card" key={i}>
          <div className="card-media skeleton" />
          <div className="card-body">
            <div className="skeleton line short" />
            <div className="skeleton line" />
            <div className="skeleton line" />
            <div className="skeleton line short" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Loader;