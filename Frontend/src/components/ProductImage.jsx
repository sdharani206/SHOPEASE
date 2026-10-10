import { useState } from "react";

const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='100%' height='100%' fill='#eef2ff'/><text x='50%' y='52%' text-anchor='middle' font-family='Arial' font-size='14' fill='#94a3b8'>No image</text></svg>`
  );

function ProductImage({ src, alt, className }) {
  const [failed, setFailed] = useState(false);
  return (
    <img
      className={className}
      src={failed ? FALLBACK : src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

export default ProductImage;
