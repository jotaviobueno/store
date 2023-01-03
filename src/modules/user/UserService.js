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

		if (await this.userRepository.findByUsername(user.username))
			return { status: 400, message: { error: "email already exist" }};
		
		if (await this.userRepository.findByEmail(user.email))
			return { status: 400, message: { error: "username already exist" }};

		const userStoraged = await this.userRepository.create(user);

		if (userStoraged) 
			return { status: 201, message: { user: UserResponseDTO(userStoraged) }};

		return { status: 500, message: { error: "Unable to handle your request, please try again" }};
	}

	showProfile(user) {
		return {status: 200, message: {user: UserResponseDTO(user)}};
	}
}

export default new UserService;