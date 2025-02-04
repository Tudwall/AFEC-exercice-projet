import mariadb from "mariadb";
import dotevn from "dotenv";
dotevn.config();

const pool = mariadb.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWROD,
	database: process.env.DATABASE,
	connectionLimit: 5,
});

const connectMariaDB = async () => {
	let conn;
	try {
		conn = await pool.getConnection();
	} catch (err) {
		console.error(err);
	} finally {
		if (conn) conn.release();
	}
};

export default connectMariaDB;
