import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema({

	first_name: { type: String, required: true, },
	last_name: { type: String, required: true, },
	username: { type: String, unique: true, required: true },
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	avatar_url: { type: String },
	genre: { type: String, required: true },
	birth_date: { type: Date, required: true },
	permissions: { type: Array, required: true, default: ["guest"] },
	email_verified_at: { type: Boolean, default: null },
	banned_at: { type: Boolean, default: null },
	created_at: { type: Date, required: true, default: new Date() },
	updated_at: { type: Date, required: true, default: new Date() },
	deleted_at: { type: Date, default: null },
});

export default mongoose.model("Users", User);