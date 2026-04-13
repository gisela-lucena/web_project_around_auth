import { Navigate, useLocation } from "react-router-dom";
import useAppState from "../hooks/useAppState.js";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const { auth } = useAppState();

  if (auth.isCheckingAuth) {
    return null;
  }

  if (!auth.isLoggedIn) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return children;
}
