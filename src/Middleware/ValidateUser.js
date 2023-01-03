import UserRepository from "../modules/User/UserRepository.js";

const _userRepository = new UserRepository;

export default async function ValidateUser(req, res, next) {
	const {session} = req;

	if (session) {
		const user =  await _userRepository.findById(session.user_id);

		if (! user )
			return res.status(403).json({error: "cannot find your account."});

		req.user = user;
		return next();
	}

	return res.status(400).json({error: "invalid session, please re-login."});
}