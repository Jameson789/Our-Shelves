import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Retry until MySQL is really ready
async function connectWithRetry(maxRetries = 20) {
  let attempt = 0;
  while (true) {
    try {
      const conn = await pool.getConnection();
      conn.release();
      console.log("Database connected successfully");
      break;
    } catch (err) {
      attempt++;
      const delay = Math.min(1000 * 2 ** Math.min(attempt, 5), 10000); // 1s→10s
      console.error(
        `DB not ready (attempt ${attempt}/${maxRetries}): ${err.code || err.message}. Retrying in ${delay}ms...`
      );
      if (attempt >= maxRetries) throw err;
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}
await connectWithRetry();

export default pool;
