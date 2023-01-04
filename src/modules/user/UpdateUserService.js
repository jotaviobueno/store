import UserRepository from "./UserRepository.js";

import ValidateGenreRequestDTO from "../../DTO/Request/ValidateGenreRequestDTO.js";

class UpdateUserService {

	_userRepository;

	constructor() {
		this._userRepository = new UserRepository;
	}

	async execute(user, fildToUpdate, value) {

		if (user[fildToUpdate] === value)
			return { status: 409, message: { error: `the ${[fildToUpdate]} entered is the same as the one on your account` }};

		const update = await this._userRepository.update(user._id, `${[fildToUpdate]}`, value);

		if (update.matchedCount === 1)
			return { status: 204, message: { success: " " }};

		return { status: 500, message: { error: "Unable to handle your request, please try again" }};
	}

	async updateGenre(user, genre) {

		if (! ValidateGenreRequestDTO(genre))
			return { status: 400, message: { error: "genre informed was invalid" }};

		if (user.genre === genre)
			return { status: 409, message: { error: "the genre entered is the same as the one on your account" }};

		const update = await this._userRepository.update(user._id, "genre", genre);

		if (update.matchedCount === 1)
			return { status: 204, message: { success: " " }};

		return { status: 500, message: { error: "Unable to handle your request, please try again" }};
	}
}

export default new UpdateUserService;