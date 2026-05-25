const pool = require("../config/db");

exports.getKeycloakUsers = async (req, res) => {
  try {
    const query = `
      SELECT
        id,
        username,
        email,
        first_name,
        last_name,
        enabled,
        email_verified,
        created_timestamp
      FROM user_entity
      ORDER BY username
    `;

    const result = await pool.query(query);

    res.json(result.rows);
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({
      message: "Không thể lấy dữ liệu người dùng từ Keycloak",
    });
  }
};