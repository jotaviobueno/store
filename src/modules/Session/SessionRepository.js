import { nanoid } from "nanoid";
import SessionModel from "../../models/Session/SessionModel.js";

class SessionRepository {

	_sessionModel;

	constructor() {
		this._sessionModel = SessionModel;
	}

	async createSession(user_id, email, userAgent, address_ip) {
		return await this._sessionModel.create({
			session_id: nanoid(),
			email: email,
			user_id: user_id,
			address_ip: address_ip,
			user_agent: userAgent
		});
	}

	async findByUserId(user_id) {
		return await this._sessionModel.findOne({user_id, disconnected_in: null});
	}

	async disconnect(_id) {
		return await this._sessionModel.updateOne({_id}, {disconnected_in: new Date()});
	}

	async findBySessionId(session_id) {
		return await this._sessionModel.findOne({session_id, disconnected_in: null});
	}
}

export default SessionRepository;