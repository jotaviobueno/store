import AuthTokenModel from "../../models/User/AuthTokenModel.js";
import { nanoid } from "nanoid";

class AuthTokenRepository {

	_authTokenModel;

	constructor() {
		this._authTokenModel = AuthTokenModel;
	}

	create(user_id, generated_for) {
		return this._authTokenModel.create({
			token: nanoid(),
			user_id: user_id,
			token_generated_for: generated_for
		});
	}

	findToken(token, generated_for) {
		return this._authTokenModel.findOne({token, status: "generated", token_generated_for: generated_for});
	}

	
	update(id, generated_for, fieldToUpdate, value) {
		return this._authTokenModel.updateOne({_id: id, status: "generated", token_generated_for: generated_for}, {
			[fieldToUpdate]: value, updated_at: new Date()
		});
	}
	
	async validateUserTokens(user_id, generated_for) {
		const tokens = await this._authTokenModel.findOne({user_id, status: "generated", token_generated_for: generated_for});

		if (tokens)
			await this.update(tokens._id, tokens.token_generated_for, "status", "discarted");
	}
	
	async validateAllTokens() {
		const allTokens = await this._authTokenModel.find({status: "generated"});

		allTokens.forEach(async (token) => {

			if (new Date() >= token.expires_at)
				await this.update(token._id, token.token_generated_for, "status", "discarted");
		
		});
	}
}

export default AuthTokenRepository;