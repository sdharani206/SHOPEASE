import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="container section">
      <div className="state-box">
        <div className="state-icon">🧭</div>
        <h2>Page not found</h2>
        <p>The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary">Go home</Link>
      </div>
    </main>
  );
}

export default NotFound;
