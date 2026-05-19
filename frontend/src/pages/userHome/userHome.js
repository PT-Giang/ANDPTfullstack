import { useEffect, useState } from "react";
import api from "../../services/api";
import { getUser, getRoles, logout, hasRole } from "../../services/auth";
import { useNavigate } from "react-router-dom";

function UserHome() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const handleManage = () => {
    if (hasRole("admin")) {
      navigate("/admin");
    } else {
      alert("Bạn không có quyền truy cập trang quản trị.");
    }
  };

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
        onClick={handleManage}
        style={{
          cursor: "pointer",
          padding: "10px 15px",
          fontSize: "14px",
        }}
      >
        Quản Lý
      </button>
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
