import SessionModel from "../../models/Session/SessionModel.js";

class SessionRepository {

	_sessionModel;

	constructor() {
		this._sessionModel = SessionModel;
	}

	async createSession(user_id, email, userAgent, address_ip) {
		return await this._sessionModel.create({
			email: email,
			user_id: user_id,
			address_ip: address_ip,
			user_agent: userAgent
		});
	}

	async findByUserId(user_id) {
		return await this._sessionModel.findOne({user_id, disconnected_in: null});
	}

	async disconnect(session_id) {
		return await this._sessionModel.updateOne({_id: session_id, disconnected_in: new Date()});
	}
}

export default SessionRepository;