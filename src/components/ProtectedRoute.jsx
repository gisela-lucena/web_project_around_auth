import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, isLoggedIn }) {
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return children;
}
