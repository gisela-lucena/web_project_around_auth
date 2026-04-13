import "../App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import Layout from "./Layout.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import InfoToolTip from "./InfoToolTip.jsx";
import AppProvider from "./AppProvider.jsx";
import useAppState from "../hooks/useAppState.js";

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

function AppContent() {
  const { auth, actions, tooltip } = useAppState();

  return (
    <>
      <Routes>
        <Route
          path="/signup"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/signin"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div className="page">
                <Header />
                <Main />
                <Footer />
              </div>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={auth.isLoggedIn ? "/" : "/signin"} replace />} />
      </Routes>
      <InfoToolTip
        isOpen={tooltip.isOpen}
        isSuccess={tooltip.isSuccess}
        message={tooltip.message}
        onClose={actions.closeInfoTooltip}
      />
    </>
  );
}
