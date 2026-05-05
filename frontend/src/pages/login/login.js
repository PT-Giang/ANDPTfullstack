import keycloak from "../../keycloak";

function LoginPage() {
  const handleLogin = () => {
    keycloak.login();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>My Secure App</h1>

      <button
        onClick={handleLogin}
        style={{
          padding: "12px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Login with Keycloak
      </button>
    </div>
  );
}

export default LoginPage;
