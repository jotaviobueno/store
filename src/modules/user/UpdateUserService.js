import UserRepository from "./UserRepository.js";
import SessionRepository from "../Session/SessionRepository.js";

import ValidateGenreRequestDTO from "../../DTO/Request/ValidateGenreRequestDTO.js";
import BcryptHelper from "../../helper/User/BcryptHelper.js";

class UpdateUserService {

	_userRepository;
	_sessionRepository;

	constructor() {
		this._userRepository = new UserRepository;
		this._sessionRepository = new SessionRepository;
	}

	async execute(user, fildToUpdate, value) {

		if (user[fildToUpdate] === value)
			return { status: 409, message: { error: `the ${[fildToUpdate]} entered is the same as the one on your account` }};
			
		const update = await this._userRepository.update(user._id, `${[fildToUpdate]}`, value);
			
		if (update.matchedCount === 1) {

			await this._userRepository.createLog(user._id, fildToUpdate, user[fildToUpdate], value);
			
			return { status: 204, message: { success: " " }};
		}

		return { status: 500, message: { error: "Unable to handle your request, please try again" }};
	}

	async updateGenre(user, genre) {

		if (! ValidateGenreRequestDTO(genre))
			return { status: 400, message: { error: "genre informed was invalid" }};

		if (user.genre === genre)
			return { status: 409, message: { error: "the genre entered is the same as the one on your account" }};

		const update = await this._userRepository.update(user._id, "genre", genre);

		if (update.matchedCount === 1) {

			await this._userRepository.createLog(user._id, "genre", user.genre, genre);

			return { status: 204, message: { success: " " }};
		}

		return { status: 500, message: { error: "Unable to handle your request, please try again" }};
	}

	async updateBirthDate(user, birth_date) {

		if (birth_date >= new Date())
			return { status: 400, message: { error: "the date entered is invalid" }};

		const update = await this._userRepository.update(user._id, "birth_date", birth_date);

		if (update.matchedCount === 1) {

			await this._userRepository.createLog(user._id, "birth_date", user.birth_date, birth_date);

			return { status: 204, message: { success: " " }};
		}

		return { status: 500, message: { error: "Unable to handle your request, please try again" }};
	}

	async changePasswordLogged(user, password, session) {
		
		if (await BcryptHelper.comparePassword(user.password, password))
			return { status: 400, message: { error: "the password entered is identical to the one on your account" }};

		const update = await this._userRepository.update(user._id, "password", await BcryptHelper.generateHash(password, 10));

		if (update.matchedCount === 1) {

			await this._userRepository.createLog(user._id, "password", "?", "?");

			await this._sessionRepository.disconnect(session._id);

			return { status: 204, message: { success: " " }};
		}
	
		return { status: 500, message: { error: "Unable to handle your request, please try again" }};
	}
}

export default new UpdateUserService;