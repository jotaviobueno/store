import AuthTokenRepository from "./AuthTokenRepository.js";
import UserRepository from "./UserRepository.js";

import AuthTokenResponseDTO from "../../DTO/Response/User/AuthTokenResponseDTO.js";
import BcryptHelper from "../../helper/User/BcryptHelper.js";

class AuthTokenService {

	_authTokenRepository;
	_userRepository;

	constructor() {
		this._authTokenRepository = new AuthTokenRepository;
		this._userRepository = new UserRepository;
	}

	async generateTokenToChangePassword(email) {
        
		await this._authTokenRepository.validateAllTokens();

		const user = await this._userRepository.findByEmail(email);

		if (! user)
			return { status: 400, message: { error: "e-mail entered is not valid" }};

		await this._authTokenRepository.validateUserTokens(user._id, "CHANGE_PASSWORD");
        
		const token = await this._authTokenRepository.create(user._id, "CHANGE_PASSWORD");

		if (token)
			return { status: 201, message: { token: AuthTokenResponseDTO(token) }};
        
		return { status: 500, message: { error: "Unable to handle your request, please try again" }};
	}

	async generateTokenToDeleteAccount(user, password) {

		if (! await BcryptHelper.comparePassword(password, user.password))
			return { status: 401, message: { error: "not authorized" }}; 
		
		const token = await this._authTokenRepository.create(user._id, "DELETE_ACCOUNT");

		if (token)
			return { status: 201, message: { token: AuthTokenResponseDTO(token) }};

		return { status: 500, message: { error: "Unable to handle your request, please try again" }};
	}
}

export default new AuthTokenService;