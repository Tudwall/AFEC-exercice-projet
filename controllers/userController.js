import UserService from "../services/userService.js";

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async getUsers(req, res) {
    try {
      const users = await this.userService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUsersById(req, res) {
    const { id } = req.params;
    try {
      const user = await this.userService.getUsersById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async createUser(req, res) {
    const { id, pfp, name, bio, email, password } = req.body;
    try {
      const newUser = await this.userService.createUser({
        id,
        pfp,
        name,
        bio,
        email,
        password,
      });
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const result = await this.userService.deleteUser(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default UserController;
