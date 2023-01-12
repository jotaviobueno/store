import ProductRepository from "./ProductRepository.js";

class UpdateProductService {

	_productRepository;

	constructor() {
		this._productRepository = new ProductRepository;
	}

	async handleSimpleUpdate(product, fildToUpdate, value) {

		if (product[fildToUpdate] === value)
			return { status: 409, message: { error: `the ${[fildToUpdate]} entered is the same as the product entered` }};
					
		if (await this._productRepository.update(product._id, `${[fildToUpdate]}`, value)) {

			return { status: 204, message: { success: " " }};
		}

		return { status: 500, message: { error: "failed to update, try again" }};
	}
}

export default new UpdateProductService;