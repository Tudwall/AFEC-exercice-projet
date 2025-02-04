import UserRepository from "../repositories/userRepository.js";

class UserService {
  constructor(userService) {
    this.UserRepository = new UserRepository();
  }

  async getUsers() {
    try {
      return await this.UserRepository.getUsers();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUsersById(id) {
    try {
      return await this.UserRepository.getUsersById(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createUser({ id, pfp, name, bio, email, password }) {
    try {
      return await this.UserRepository.createUser({
        id,
        pfp,
        name,
        bio,
        email,
        password,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteUser(id) {
    try {
      const deletedUser = await this.UserRepository.deleteUser(id);
      if (!deletedUser) {
        throw new Error("Utilisateur non trouvé");
      }
      return { message: "Utilisateur supprimé" };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default UserService;
