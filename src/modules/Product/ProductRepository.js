import ProductModel from "../../models/Product/ProductModel.js";

import { nanoid } from "nanoid";

class ProductRepository {

	_productModel;

	constructor() {
		this._productModel = ProductModel;
	}

	async create(user_id, product) {
		return await this._productModel.create({
			name: product.name,
			description: product.description,
			product_id: nanoid(),
			user_id: user_id,
			price: Number(product.price),
			stock: Number(product.stock),
			category: product.category,
			product_images: product.product_images,
		});
	}

	async update(_id, fildToUpdate, value) {
		return await this._productModel.updateOne({_id, deleted_at: null}, {
			[fildToUpdate]: value, updated_at: new Date()
		});
	}

	async findProductById(product_id) {
		return await this._productModel.findOne({ product_id, deleted_at: null });
	}
}

export default ProductRepository;