function Rating({ rate = 0, count }) {
  const full = Math.round(rate);
  return (
    <div className="rating" aria-label={`Rated ${rate} out of 5`}>
      <span className="stars" aria-hidden="true">
        {"★".repeat(full)}
        <span className="stars-off">{"★".repeat(5 - full)}</span>
      </span>
      <span className="rating-text">
        {rate}
        {count != null && ` (${count})`}
      </span>
    </div>
  );
}

export default Rating;
