import UserRepository from "./UserRepository.js";

class UpdateUserService {

	_userRepository;

	constructor() {
		this._userRepository = new UserRepository;
	}

	async updateUsername(user, username) {
        
		if (user.username === username)
			return { status: 409, message: { error: "the name entered is the same as your account" }};

		const update = await this._userRepository.update(user._id, "username", username);

		if (update.matchedCount === 1)
			return { status: 204, message: { success: " " }};

		return { status: 500, message: { error: "Unable to handle your request, please try again" }};
	}

}

export default new UpdateUserService;