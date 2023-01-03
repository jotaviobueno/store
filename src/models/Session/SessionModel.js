import mongoose from "mongoose";
import { nanoid } from "nanoid";

const Schema = mongoose.Schema;

const session = new Schema({

	session_id: { type: String, unique: true, required: true, default: nanoid() },
	email: { type: String, required: true, },
	user_id: { type: mongoose.Types.ObjectId, required: true, ref: "Users" },
	address_ip: { type: String, required: true },
	user_agent: { type: String, required: true },
	expires_at: { type: Date, required: true, default: new Date().setHours(new Date().getHours() + 6) },
	created_at: { type: Date, required: true, default: new Date() },
	updated_at: { type: Date, required: true, default: new Date() },
	disconnected_in: { type: Date, default: null }
});

export default mongoose.model("session", session);