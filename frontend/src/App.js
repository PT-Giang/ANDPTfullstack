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
    keycloak
      .init({
        checkLoginIframe: false,
        pkceMethod: false,
      })
      .then((auth) => {
        console.log("AUTH:", auth);

        setAuthenticated(auth);
        setReady(true);
      })
      .catch((err) => {
        console.error("KEYCLOAK INIT ERROR:", err);

        setReady(true);
      });
  }, []);

  if (!ready) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route
          path="/login"
          element={authenticated ? <Navigate to="/" /> : <LoginPage />}
        />

        {/* USER */}
        <Route
          path="/"
          element={authenticated ? <UserHome /> : <Navigate to="/login" />}
        />

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
