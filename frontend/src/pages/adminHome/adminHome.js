import { useEffect, useState, useRef } from "react";
import api from "../../services/api";
import { getUser, logout } from "../../services/auth";

function AdminHome() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/api/admin")
      .then((res) => setData(res.data))
      .catch(() => setError("Không có quyền truy cập"));
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <p>
        <b>User:</b> {getUser()}
      </p>

      {error && <p>{error}</p>}

      {!data && !error && <p>Loading...</p>}

      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      <button
        onClick={logout}
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

export default AdminHome;
