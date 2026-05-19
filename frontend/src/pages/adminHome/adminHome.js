import { useEffect, useState } from "react";
import { getKeycloakUsers } from "../../services/api";
import api from "../../services/api";
import { getUser } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import UserTable from "../../components/UserTable";

function AdminHome() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const backHome = () => {
    navigate("/");
  };

  useEffect(() => {
    api
      .get("/api/admin")
      .then((res) => setData(res.data))
      .catch(() => setError("Không có quyền truy cập"));
    const loadUsers = async () => {
      try {
        const data = await getKeycloakUsers();
        setUsers(data);
      } catch (error) {
        console.error("Không thể tải danh sách user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
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
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <>
          <h2>Danh sách người dùng từ Keycloak PostgreSQL</h2>
          <UserTable users={users} />
        </>
      )}
      <button
        onClick={backHome}
        style={{
          cursor: "pointer",
          padding: "10px 15px",
          fontSize: "14px",
        }}
      >
        Trang chủ
      </button>
    </div>
  );
}

export default AdminHome;
