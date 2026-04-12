import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, isLoggedIn, isCheckingAuth }) {
  const location = useLocation();

  if (isCheckingAuth) {
    return null;
  }

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return children;
}
