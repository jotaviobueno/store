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

	async updateGenre(req, res) {
		const {user} = req;
		const genre = req.body.genre.toUpperCase();

		const {status, message} = await UpdateUserService.updateGenre(user, genre);

		return res.status(status).json(message);
	}

	async updateBirthDate(req, res) {
		const {user} = req;
		const birth_date = new Date(req.body.birth_date);

		const {status, message} = await UpdateUserService.updateBirthDate(user, birth_date);

		return res.status(status).json(message);
	}

	async changePasswordLogged(req, res) {
		const {user, session} = req;
		const {password} = req.body;

		const {status, message} = await UpdateUserService.changePasswordLogged(user, password, session);

		return res.status(status).json(message);
	}
}

export default new UpdateUserController;