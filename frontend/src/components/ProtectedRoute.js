import { hasRole } from "../services/auth";

function ProtectedRoute({ role, children }) {
  if (!hasRole(role)) {
    return <h2>403 - Forbidden</h2>;
  }

  return children;
}

export default ProtectedRoute;
