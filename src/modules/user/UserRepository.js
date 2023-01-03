import UserModel from "../../models/User/UserModel.js";

import BcryptHelper from "../../helper/User/BcryptHelper.js";

class UserRepository {

	_userModel;

	constructor() {
		this._userModel = UserModel;
	}

	async findByUsername(username) {
		return await this._userModel.findOne({username, deleted_at: null, banned_at: null});
	}

	async findByEmail(email) {
		return await this._userModel.findOne({email, deleted_at: null, banned_at: null});
	}

	async findById(id) {
		return await this._userModel.findOne({_id: id, deleted_at: null, banned_at: null});
	}

	async create(user) {
		return await this._userModel.create({
			first_name: user.first_name, 
			last_name: user.last_name, 
			username: user.username, 
			email: user.email, 
			password: await BcryptHelper.generateHash(user.password), 
			avatar_url: user.avatar_url ?? " ", 
			genre: user.genre, 
			birth_date: new Date(user.birth_date), 
		});
	}
}

export default UserRepository;