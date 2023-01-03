import UserService from "./UserService.js";

class UserController {

	async create(req, res) {
		const user = {
			first_name: req.body.first_name, 
			last_name: req.body.last_name, 
			username: req.body.username.replace(" ", ""), 
			email: req.body.email, 
			password: req.body.password, 
			avatar_url: req.body.avatar_url, 
			genre: req.body.genre, 
			birth_date: req.body.birth_date
		};

		user.genre = user.genre.toUpperCase();

		const {status, message} = await UserService.create(user);

		return res.status(status).json(message);
	}

	showProfile(req, res) {
		const {user} = req;

		const {status, message} = UserService.showProfile(user);

		return res.status(status).json(message);
	}
}

export default new UserController;