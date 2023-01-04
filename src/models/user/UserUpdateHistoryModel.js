import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserUpdateHistoryModel = new Schema({

	fieldUpdated: { type: String, required: true },
	oldValue: { type: String, required: true },
	value: { type: String, required: true },
	user_id: { type: mongoose.Types.ObjectId, required: true, ref: "Users" },
	created_at: { type: Date, required: true, default: new Date() },
	updated_at: { type: Date, required: true, default: new Date() },
});

export default mongoose.model("UserUpdateHistory", UserUpdateHistoryModel);