import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Product = new Schema({

	name: { type: String, required: true, },
	description: { type: String, required: true, },
	user_id: { type: mongoose.Types.ObjectId, required: true, ref: "Users" },
	price: { type: Number, required: true, min: 0 },
	discount: { type: Number, default: 0, min: 0 },
	stock: { type: Number, required: true, default: 1, min: 0, maxLength: 4, },
	category: { type: [String] },
	product_images: { type: [String] },
	is_active: { type: Boolean, default: true },
	reviews: [
		{
			user:{ type: mongoose.Schema.ObjectId, ref: "Users", },
			name: { type: String, },
			rating: { type: String, },
			comment: { type: String, }
		}
	],
	created_at: { type: Date, default: new Date() },
	updated_at: { type: Date, default: new Date() },
	deleted_at: { type: Date, default: null },
});

export default mongoose.model("Product", Product);