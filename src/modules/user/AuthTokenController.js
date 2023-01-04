import AuthTokenService from "./AuthTokenService.js";

class AuthTokenController {

	async generateTokenToChangePassword(req, res) {
		const {email} = req.body;

		const {status, message} = await AuthTokenService.generateTokenToChangePassword(email);
		
		return res.status(status).json(message);
	}

}

export default new AuthTokenController;