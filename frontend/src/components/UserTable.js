import React from "react";

function UserTable({ users }) {
  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    return new Date(Number(timestamp)).toLocaleString("vi-VN");
  };

  return (
    <table
      border="1"
      cellPadding="8"
      style={{ borderCollapse: "collapse", width: "100%" }}
    >
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Họ</th>
          <th>Tên</th>
          <th>Enabled</th>
          <th>Email Verified</th>
          <th>Ngày tạo</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.enabled ? "Có" : "Không"}</td>
            <td>{user.email_verified ? "Đã xác minh" : "Chưa xác minh"}</td>
            <td>{formatDate(user.created_timestamp)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
