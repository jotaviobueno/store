import UserRepository from "./UserRepository.js";

import ValidateGenreRequestDTO from "../../DTO/Request/ValidateGenreRequestDTO.js";
import UserResponseDTO from "../../DTO/Response/User/UserResponseDTO.js";

class UserService {

	constructor() {
		this.userRepository = new UserRepository;
	}

	async create(user) {

		if (! ValidateGenreRequestDTO(user.genre))
			return { status: 400, message: { error: "invalid genre" }};

		const userStoraged = await this.userRepository.create(user);

		if (userStoraged) 
			return { status: 201, message: { user: UserResponseDTO(userStoraged) }};

		return { status: 400, message: { error: "email or username already exist" }};
	}

	showProfile(user) {
		return {status: 200, message: {user: UserResponseDTO(user)}};
	}

	async showAUserProfile(username) {
		const outherUser = await this.userRepository.findByUsername(username);

		if (! outherUser)
			return { status: 404, message: {error: "profile not found" }};

		return { status: 200, message: {user: UserResponseDTO(outherUser) }}; 
	}
}

export default new UserService;