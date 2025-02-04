import UserRepository from "../repositories/userRepository.js";

class UserService {
	constructor() {
		this.UserRepository = new UserRepository();
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
		} catch (err) {
			console.error(`createUser Service ${err.message}`);
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

	async updateUser(id, { pfp, name, bio, email, password }) {
		try {
			const updatedUser = await this.UserRepository.updateUser(id, {
				pfp,
				name,
				bio,
				email,
				password,
			});
			if (!updatedUser) {
				throw new Error("Utilisateur introuvable");
			}
			return updatedUser;
		} catch (err) {
			throw new Error(err.message);
		}
	}
}

export default UserService;
