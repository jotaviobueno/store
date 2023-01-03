import UpdateUserService from "./UpdateUserService.js";

class UpdateUserController {

	async updateUsername(req, res) {
		const {user} = req;
		const username = req.body.username.replace(" ", "");

		const {status, message} = await UpdateUserService.updateUsername(user, username);

		return res.status(status).json(message);
	}
}

export default new UpdateUserController;