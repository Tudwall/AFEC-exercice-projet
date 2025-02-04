import UserService from "../services/userService.js";

class UserController {
	constructor() {
		this.userService = new UserService();
	}

	async createUser(req, res) {
		const { pfp, name, bio, email, password } = res.body;
		try {
			const newUser = await this.userService.createUser({
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
}

export default UserController;
