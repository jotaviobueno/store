import UserModel from "../../models/User/UserModel.js";
import UserUpdateHistoryModel from "../../models/User/UserUpdateHistoryModel.js";

import BcryptHelper from "../../helper/User/BcryptHelper.js";

class UserRepository {

	_userModel;
	_userUpdateHistoryModel;

	constructor() {
		this._userModel = UserModel;
		this._userUpdateHistoryModel = UserUpdateHistoryModel;
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
		try {
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
		} catch(e) {
			return false;
		}
	}

	async createLog(user_id, field, oldValue, value) {
		return await this._userUpdateHistoryModel.create({
			fieldUpdated: field,
			oldValue: oldValue,
			value: value,
			user_id: user_id,
		});
	}

	async updateAndCreateLog(id, fieldToUpdate, oldValue, value) {
		try {
			const update = await this._userModel.updateOne({_id: id, deleted_at: null, banned_at: null}, {
				[fieldToUpdate]: value, updated_at: new Date()
			});
	
			if (update.modifiedCount === 1) {
				await this.createLog(id, fieldToUpdate, oldValue, value);
	
				return true;
			}
	
			return false;
		} catch(e) {
			return false;
		}
	}

	async update(id, fieldToUpdate, value) {
		return await this._userModel.updateOne({_id: id, deleted_at: null, banned_at: null}, {
			[fieldToUpdate]: value, updated_at: new Date()
		});
	}
}

export default UserRepository;