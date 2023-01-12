import ProductRepository from "./ProductRepository.js";

import ProductResponseDTO from "../../DTO/Response/Product/ProductResponseDTO.js";

class ProductService {

	_productRepository;

	constructor() {
		this._productRepository = new ProductRepository;
	}

	async createProduct(user, product) {
		try {

			if (product.stock >= 1000)
				return { status: 400, message: { error: "the quantity of stock is above the allowed" }};

			if (product.stock < 1)
				return { status: 400, message: { error: "you are putting a value below the acceptable stock" }};

			if (product.price < 1)
				return { status: 400, message: { error: "the minimum value of the price is R$1, that is, below that will not be accepted" }};

			if (product.price >= 1000000000)
				return { status: 400, message: { error: "the reported value is above acceptable" }};

			if (product.category.length >= 5)
				return { status: 400, message: { error: "" }};

			if (product.product_images.length >= 5)
				return { status: 400, message: { error: "the amount of categories has reached its maximum number allowed, the maximum is 4" }};

			const storedProduct = await this._productRepository.create(user._id, product);

			if (storedProduct)
				return { status: 201, message: { product: ProductResponseDTO.treatOnlyOneProduct(storedProduct) }};

			return { status: 500, message: { error: "Failed to create product, please try again" }};

		} catch(e) {
			return { status: 422, message: { error: "some information is with its described type different from the accepted one" }};
		}
	}

	async showManyProduct() {
		return { status: 200, message: { products: ProductResponseDTO.treatManyProducts(await this._productRepository.findAll() )}};
	}

	async showProduct(product) {
		return { status: 200, message: { product: ProductResponseDTO.treatOnlyOneProduct(product) }};
	}
}

export default new ProductService;