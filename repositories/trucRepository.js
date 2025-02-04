import mariadb from "mariadb";
import dotenv from "dotenv";
dotenv.config();

const database = "trucs";

class TrucRepository {
	constructor() {
		this.pool = mariadb.createPool({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DATABASE,
			connectionLimit: 5,
		});
	}

	async deleteTruc(id) {
		let conn;
		try {
			conn = await this.pool.getConnection();
			const result = await conn.query(`DELETE FROM ${database} WHERE id = ?`, [
				id,
			]);
			if (result.affectedRows === 0) throw new Error("Utilisateur non trouvé");
			return { message: "Utilisateur supprimé avec succès" };
		} catch (err) {
			throw new Error(
				"Erreur lors de la suppression de l'utilisateur" + err.message
			);
		} finally {
			if (conn) conn.release();
		}
	}
}

export default TrucRepository;
