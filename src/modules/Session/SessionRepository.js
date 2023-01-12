import { nanoid } from "nanoid";
import SessionModel from "../../models/Session/SessionModel.js";

class SessionRepository {

	_sessionModel;

	constructor() {
		this._sessionModel = SessionModel;
	}

	createSession(user_id, email, userAgent, address_ip) {
		return this._sessionModel.create({
			session_id: nanoid(),
			email: email,
			user_id: user_id,
			address_ip: address_ip,
			user_agent: userAgent
		});
	}

	findByUserId(user_id) {
		return this._sessionModel.findOne({user_id, disconnected_in: null});
	}

	disconnect(_id) {
		return this._sessionModel.updateOne({_id}, {disconnected_in: new Date()});
	}

	findBySessionId(session_id) {
		return this._sessionModel.findOne({session_id, disconnected_in: null});
	}
}

export default SessionRepository;