import SessionService from "./SessionService.js";

class SessionController {

	async create(req, res) {
		const {email, password} = req.body;
		const address_ip = req.ip;
		const userAgent = req.headers["user-agent"];

		const {status, message} = await SessionService.create(email, password, address_ip, userAgent);

		return res.status(status).json(message);
	}
}

export default new SessionController;