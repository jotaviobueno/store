import SessionRepository from "../modules/Session/SessionRepository.js";

import CompareSession from "../helper/Session/CompareSession.js";

const _sessionRepository = new SessionRepository;

export default async function ValidateSession(req, res, next) {
	const {session_id} = req.headers;
	const address_ip = req.ip;
	const userAgent = req.headers["user-agent"];

	const session = await _sessionRepository.findBySessionId(session_id);

	if  (! session) 
		return res.status(400).json({error: "invalid session, please re-login."});

	if (new Date() >= session.expires_at) {

		await _sessionRepository.disconnect(session._id);

		return res.status(403).json({error: "session expired please re-login."});
	}

	if (! CompareSession(session, userAgent, address_ip))  
		return res.status(401).json({error: "not authorized."});

	req.session = session;
	next();
}