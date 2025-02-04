import UserRepository from "../repositories/userRepository.js";

class UserService {
	constructor(userService) {
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
}

export default UserService;
