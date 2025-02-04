import mariadb from "mariadb";

class UserRepository {
	constructor() {
		this.pool = mariadb.createPool({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWROD,
			database: process.env.DATABASE,
			connectionLimit: 5,
		});
	}

	async createUser({ pfp, name, bio, email, password }) {
		let conn;
		try {
			conn = await this.pool.getConnection();
			const result = await conn.query(
				"INSERT INTO USERS (id, pfp, name, bio, email, password) VALUES (?,?,?,?,?)",
				[pfp, name, bio, email, password]
			);
			return { id: result.insertId, pfp, name, bio, email, password };
		} catch (err) {
			throw new Error(
				"Erreur lors de la création de l'utilisateur: " + err.message
			);
		} finally {
			if (conn) conn.release();
		}
	}
}

export default UserRepository;
