import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import keycloak from "./keycloak";
import { hasRole } from "./services/auth";

import LoginPage from "./pages/login/login";
import UserHome from "./pages/userHome/userHome";
import AdminHome from "./pages/adminHome/adminHome";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!window._keycloakInitialized) {
      keycloak.init({ onLoad: "check-sso" }).then((auth) => {
        // auth là kết quả xác thực
        window._keycloakInitialized = true;
        setAuthenticated(auth); // Cập nhật trạng thái tại đây
        setReady(true);
      });
    } else {
      setAuthenticated(keycloak.authenticated);
      setReady(true);
    }
  }, []);

  if (!ready) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route
          path="/login"
          element={
            authenticated ? (
              hasRole("admin") ? (
                <Navigate to="/admin" />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <LoginPage />
            )
          }
        />

        {/* USER */}
        <Route
          path="/"
          element={authenticated ? <UserHome /> : <Navigate to="/login" />}
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            authenticated ? (
              hasRole("admin") ? (
                <AdminHome />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
