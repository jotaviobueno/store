import UserRepository from "./UserRepository.js";
import SessionRepository from "../Session/SessionRepository.js";
import AuthTokenRepository from "./AuthTokenRepository.js";

import ValidateGenreRequestDTO from "../../DTO/Request/ValidateGenreRequestDTO.js";
import BcryptHelper from "../../helper/User/BcryptHelper.js";

class UpdateUserService {

	_userRepository;
	_sessionRepository;
	_authTokenRepository;

	constructor() {
		this._userRepository = new UserRepository;
		this._sessionRepository = new SessionRepository;
		this._authTokenRepository = new AuthTokenRepository;
	}

	async handleSimpleUpdate(user, fildToUpdate, value) {

		if (user[fildToUpdate] === value)
			return { status: 409, message: { error: `the ${[fildToUpdate]} entered is the same as the one on your account` }};
					
		if (await this._userRepository.updateAndCreateLog(user._id, `${[fildToUpdate]}`, user[fildToUpdate], value)) {

			return { status: 204, message: { success: " " }};
		}

		return { status: 400, message: { error: "username already exist" }};
	}

	async updateGenre(user, genre) {

		if (! ValidateGenreRequestDTO(genre))
			return { status: 400, message: { error: "genre informed was invalid" }};

		if (user.genre === genre)
			return { status: 409, message: { error: "the genre entered is the same as the one on your account" }};

		
		if (await this._userRepository.updateAndCreateLog(user._id, "genre", user.genre, genre)) {

			return { status: 204, message: { success: " " }};
		}

		return { status: 500, message: { error: "Unable to handle your request, please try again" }};
	}

	async updateBirthDate(user, birth_date) {

		if (birth_date >= new Date())
			return { status: 400, message: { error: "the date entered is invalid" }};

		
		if (await this._userRepository.updateAndCreateLog(user._id, "birth_date", user.birth_date, birth_date)) {

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

	async changeThePasswordWithAToken(token, password) {
		
		const tokenInformation = await this._authTokenRepository.findToken(token);

		if (! tokenInformation)
			return { status: 401, message: { error: "informed token is not valid" }};

		if  (new Date() >= tokenInformation.expires_at) {

			await this._authTokenRepository.update(tokenInformation._id, tokenInformation.token_generated_for, "status", "discarted");

			return { status: 400, message: { error: "this token has expired" }};
		}

		const user = await this._userRepository.findById(tokenInformation.user_id);

		if (! user)
			return { status: 403, message: { error: "cannot find your account" }};

		const session = await this._sessionRepository.findByUserId(user._id);

		if (await BcryptHelper.comparePassword(password, user.password))
			return { status: 400, message: { error: "entered password is the same as in your account" }};

		const update = await this._userRepository.update(user._id, "password", await BcryptHelper.generateHash(password, 10));

		if (update.matchedCount === 1) {

			await this._userRepository.createLog(user._id, "password", "?", "?");
			
			if (session)
				await this._sessionRepository.disconnect(session._id);

			await this._authTokenRepository.update(tokenInformation._id, tokenInformation.token_generated_for, "status", "used");

			return { status: 204, message: { success: " " }};
		}

		return { status: 500, message: { error: "Unable to handle your request, please try again" }};
	}

	async deleteAccount(user, session, token) {

		const tokenInformation = await this._authTokenRepository.findToken(token, "DELETE_ACCOUNT");

		if (! tokenInformation) 
			return { status: 403, message: { error: "token not found" }};

		if (tokenInformation.user_id.toString() != user._id.toString()) {

			await this._authTokenRepository.update(tokenInformation._id, tokenInformation.token_generated_for, "status", "discarted");

			return { status: 401, message: { error: "not authorized" }};
		}

		if (await this._userRepository.updateAndCreateLog(user._id, "deleted_at", user.deleted_at, new Date())) {

			await this._authTokenRepository.update(tokenInformation._id, tokenInformation.token_generated_for, "status", "used");

			await this._sessionRepository.disconnect(session._id);

			return { status: 204, message: { success: " " }};
		}

		return { status: 500, message: { error: "Unable to handle your request, please try again" }};
	}
}

export default new UpdateUserService;