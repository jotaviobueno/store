import UpdateUserService from "./UpdateUserService.js";

class UpdateUserController {

	async updateUsername(req, res) {
		const {user} = req;
		const username = req.body.username.replace(" ", "");

		const {status, message} = await UpdateUserService.execute(user, "username", username);

		return res.status(status).json(message);
	}

	async updateFirstName(req, res) {
		const {user} = req;
		const {first_name} = req.body;

		const {status, message} = await UpdateUserService.execute(user, "first_name", first_name);

		return res.status(status).json(message);
	}

	async updateLastName(req, res) {
		const {user} = req;
		const {last_name} = req.body;

		const {status, message} = await UpdateUserService.execute(user, "last_name", last_name);

		return res.status(status).json(message);
	}
}

export default new UpdateUserController;