import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";

function Toast() {
  const { toast } = useCart();
  if (!toast) return null;

  return (
    <div className="toast" role="status" key={toast.id}>
      <span>✓ {toast.message}</span>
      <Link to="/cart">View cart</Link>
    </div>
  );
}

export default Toast;
