import { useEffect } from "react";
import "./App.css";
import keycloak from "./keycloak";

function App() {
  useEffect(() => {
    keycloak.init({ onLoad: "login-required" }).then((authenticated) => {
      console.log("Authenticated:", authenticated);
      console.log("Token:", keycloak.token);
    });
  }, []);

  return (
    <div>
      <h1>React + Keycloak Login</h1>
      <button onClick={() => keycloak.logout()}>Logout</button>
    </div>
  );
}

export default App;
