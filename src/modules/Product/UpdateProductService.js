import ProductRepository from "./ProductRepository.js";

class UpdateProductService {

	_productRepository;

	constructor() {
		this._productRepository = new ProductRepository;
	}

	async handleSimpleUpdate(product, fildToUpdate, value) {

		if (product[fildToUpdate] === value)
			return { status: 409, message: { error: `the ${[fildToUpdate]} entered is the same as the product entered` }};

		if (fildToUpdate === "stock") {
			if (value >= 1000)
				return { status: 400, message: { error: "the quantity of stock is above the allowed" }};

			if (value < 1)
				return { status: 400, message: { error: "you are putting a value below the acceptable stock" }};
		}

		if (fildToUpdate === "price") {
			if (product.price < 1)
				return { status: 400, message: { error: "the minimum value of the price is R$1, that is, below that will not be accepted" }};

			if (product.price >= 1000000000)
				return { status: 400, message: { error: "the reported value is above acceptable" }};
		}

		if (await this._productRepository.update(product._id, `${[fildToUpdate]}`, value)) {

			return { status: 204, message: { success: " " }};
		}

		return { status: 500, message: { error: "failed to update, try again" }};
	}
}

export default new UpdateProductService;