import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AuthTokenModel = new Schema({

	token: { type: String, required: true, },
	status: { type: String, required: true, default: "generated" },
	email: { type: String, required: true, },
	user_id: { type: mongoose.Types.ObjectId, required: true, ref: "Users" },
	token_generated_for: { type: String, required: true },
	expires_at: { type: Date, required: true, default: new Date().setHours(new Date().getHours() + 6) },
	created_at: { type: Date, required: true, default: new Date() },
	updated_at: { type: Date, required: true, default: new Date() },
});

export default mongoose.model("authToken", AuthTokenModel);