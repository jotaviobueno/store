import UpdateUserService from "./UpdateUserService.js";

class UpdateUserController {

	async updateUsername(req, res) {
		const {user} = req;
		const username = req.body.username.replace(" ", "");

		const {status, message} = await UpdateUserService.updateUsername(user, username);

		return res.status(status).json(message);
	}

	async updateFirstName(req, res) {
		const {user} = req;
		const {first_name} = req.body;

		const {status, message} = await UpdateUserService.updateFirstName(user, first_name);

		return res.status(status).json(message);
	}

	async updateLastName(req, res) {
		const {user} = req;
		const {last_name} = req.body;

		const {status, message} = await UpdateUserService.updateFirstName(user, last_name);

		return res.status(status).json(message);
	}
}

export default new UpdateUserController;