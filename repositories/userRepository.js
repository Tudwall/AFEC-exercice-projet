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

  async getUsers() {
    let conn;
    try {
      conn = await this.pool.getConnection();
      return await conn.query("SELECT * FROM USER");
    } catch (error) {
      throw new Error(
        "Erreur lors de la récupération des utilisateurs : " + error.message
      );
    }
  }

  async getUsersById(id) {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const rows = await conn.query("SELECT * FROM USER WHERE id = ?", [id]);
      return rows[0] || null;
    } catch (error) {
      throw new Error(
        "Erreur lors de la récupération de l'utilisateur : " + error.message
      );
    } finally {
      if (conn) conn.release();
    }
  }

  async createUser({ id, pfp, name, bio, email, password }) {
    let conn;
    try {
      conn = await this.pool.getConnection();
      await conn.query(
        "INSERT INTO USER (id, pfp, name, bio, email, password) VALUES (?,?,?,?,?,?)",
        [id, pfp, name, bio, email, password]
      );
      return { id, pfp, name, bio, email, password };
    } catch (err) {
      throw new Error(
        "Erreur lors de la création de l'utilisateur: " + err.message
      );
    } finally {
      if (conn) conn.release();
    }
  }

  async deleteUser(id) {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const result = await conn.query("DELETE FROM USER WHERE id = ?", [id]);
      if (result.affectedRows === 0) throw new Error("Utilisateur non trouvé");
      return { message: "Utilisateur supprimé avec succés" };
    } catch (error) {
      throw new Error(
        "Erreur lors de la suppression de l'utilisateur: " + error.message
      );
    } finally {
      if (conn) conn.release();
    }
  }
}

export default UserRepository;
