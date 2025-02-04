import UserRepository from "../repositories/userRepository.js";

class UserService {
	constructor() {
		this.UserRepository = new UserRepository();
	}

	async createUser({ pfp, name, bio, email, password }) {
		try {
			return await this.UserRepository.createUser({
				pfp,
				name,
				bio,
				email,
				password,
			});
		} catch (err) {
			throw new Error(err.message);
		}
	}

	async getUsers() {
		try {
			return await this.UserRepository.getUsers();
		} catch (err) {
			throw new Error(err.message);
		}
	}

	async getUserById(id) {
		try {
			return await this.UserRepository.getUserById(id);
		} catch (err) {
			throw new Error(err.message);
		}
	}
}

export default UserService;
