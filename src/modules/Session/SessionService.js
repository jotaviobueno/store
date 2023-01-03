import UserRepository from "../User/UserRepository.js";
import SessionRepository from "../Session/SessionRepository.js";

import BcryptHelper from "../../helper/user/BcryptHelper.js";
import SessionResponseDTo from "../../DTO/Response/Session/SessionResponseDTO.js";

class SessionService {

	_userRepository;
	_sessionRepository;

	constructor() {
		this._userRepository = new UserRepository;
		this._sessionRepository = new SessionRepository;
	}

	async create(email, password, address_ip, userAgent) {
		const user = await this._userRepository.findByEmail(email);

		if (! user )
			return { status: 401, message: { error: "credentials invalid" }};

		if (! await BcryptHelper.comparePassword(password, user.password))
			return { status: 401, message: { error: "credentials invalid" }};
        
		const userSessions = await this._sessionRepository.findByUserId();

		if (userSessions) {
			await this._sessionRepository.disconnect(userSessions._id);
		}

		const session = await this._sessionRepository.createSession(user._id, email, userAgent, address_ip);

		if (session)
			return { status: 200, message: { session: SessionResponseDTo(session) }};

		return { status: 400, message: { error: "email already exist" }};
	}
}

export default new SessionService;