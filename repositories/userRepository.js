import mariadb from "mariadb";
import dotenv from "dotenv";
dotenv.config();

class UserRepository {
	constructor() {
		this.pool = mariadb.createPool({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DATABASE,
			connectionLimit: 5,
		});
	}

	async createUser({ id, pfp, name, bio, email, password }) {
		let conn;
		try {
			conn = await this.pool.getConnection();
			await conn.query(
				"INSERT INTO users (id, pfp, name, bio, email, password) VALUES (?,?,?,?,?,?)",
				[id, pfp, name, bio, email, password]
			);
			return { id, pfp, name, bio, email, password };
		} catch (err) {
			console.error(`createUser repository ${err}`);
			throw new Error(
				"Erreur lors de la création de l'utilisateur: " + err.message
			);
		} finally {
			if (conn) conn.release();
		}
	}

	async getUsers() {
		let conn;
		try {
			conn = await this.pool.getConnection();
			return await conn.query("SELECT * FROM users");
		} catch (err) {
			throw new Error(
				"Erreur lors de la récupération de l'utilisation: " + err.message
			);
		} finally {
			if (conn) conn.release();
		}
	}

	async getUserById(id) {
		let conn;
		try {
			conn = await this.pool.getConnection();
			const rows = await conn.query("SELECT * FROM users WHERE id = ?", [id]);
			return rows[0] || null;
		} catch (err) {
			throw new Error(
				"Erreur lors de la récupération de l'utilisateur:" + err.message
			);
		} finally {
			if (conn) conn.release();
		}
	}

	async updateUser(id, { pfp, name, bio, email, password }) {
		let conn;
		try {
			conn = await this.pool.getConnection();
			const result = await conn.query(
				"UPDATE users SET pfp = ?, name = ?, bio = ?, email = ?, password = ? WHERE id = ?",
				[pfp, name, bio, email, password, id]
			);
			if (result.affectedRows === 0) throw new Error("Utilisateur non trouvé");
			return { id, pfp, name, bio, email, password };
		} catch (err) {
			throw new Error(
				"Erreur lors de la mise à jour de l'utilisateur: " + err.message
			);
		} finally {
			if (conn) conn.release();
		}
	}
}

export default UserRepository;
