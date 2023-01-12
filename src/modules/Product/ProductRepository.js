import ProductModel from "../../models/Product/ProductModel.js";

class ProductRepository {

	_productModel;

	constructor() {
		this._productModel = ProductModel;
	}

	async create(user_id, product) {
		return await this._productModel.create({
			name: product.name,
			description: product.description,
			user_id: user_id,
			price: Number(product.price),
			stock: Number(product.stock),
			category: product.category,
			product_images: product.product_images,
		});
	}

}

export default ProductRepository;