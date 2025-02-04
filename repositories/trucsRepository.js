import mariadb from "mariadb";
import dotenv from "dotenv";
dotenv.config();

class TrucsRepository {
  constructor() {
    this.pool = mariadb.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      connectionLimit: 5,
    });
  }

  async updateTrucs(id, { cover, title, ext_id, author, release_date }) {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const result = conn.query(
        "UPDATE USER SET cover = ?, title = ?, ext_id = ?, author = ?, release_date = ? WHERE id = ?",
        [cover, title, ext_id, author, release_date, id]
      );
      if (result.affectedRows === 0) throw new Error("Truc non trouvé");
      return [cover, title, ext_id, author, release_date];
    } catch (error) {
      throw new Error("Erreur lors de la mise à jour" + error.message);
    } finally {
      if (conn) conn.release();
    }
  }
}

export default TrucsRepository;
