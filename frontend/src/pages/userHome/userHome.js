import { useEffect, useState } from "react";
import api from "../../services/api";
import { getUser, getRoles, logout } from "../../services/auth";

function UserHome() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api
      .get("/api")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>User Home</h1>

      <p>
        <b>User:</b> {getUser()}
      </p>
      <p>
        <b>Roles:</b> {getRoles().join(", ")}
      </p>

      {!data && <p>Loading...</p>}

      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      <button
        onClick={logout}
        style={{
          cursor: "pointer",
          padding: "10px 15px",
          fontSize: "14px",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default UserHome;
