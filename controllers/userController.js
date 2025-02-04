import UserService from "../services/userService.js";

class UserController {
	constructor() {
		this.userService = new UserService();
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
			console.log(newUser);
			res.status(201).json(newUser);
		} catch (err) {
			console.error(`createUser Controller ${err.message}`);
			res.status(400).json({ err: err.message });
		}
	}

	async getUsers(req, res) {
		try {
			const users = await this.userService.getUsers();
			res.status(200).json({ users });
		} catch (err) {
			throw new Error({ err: message.err });
		}
	}

	async getUserById(req, res) {
		const { id } = req.params;
		try {
			const user = await this.userService.getUserById(id);
			res.status(200).json({ user });
		} catch (err) {
			res.status(404).json({ err: err.message });
		}
	}

	async updateUser(req, res) {
		const { id } = req.params;
		const { pfp, name, bio, email, password } = req.body;
		try {
			const updatedUser = await this.userService.updateUser(id, {
				pfp,
				name,
				bio,
				email,
				password,
			});
			res.status(200).json(updatedUser);
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	}
}

export default UserController;
