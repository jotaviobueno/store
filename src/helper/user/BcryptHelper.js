import {hash, compare} from "bcrypt";

class BcryptHelper {
	async generateHash(password, salt) {
		return await hash(password, salt ?? 10);
	}
}

export default new BcryptHelper;