import UpdateProductService from "./UpdateProductService.js";

class UpdateProductController {
 
	async updateProductName(req, res) {
		const {product} = req;
		const {name} = req.body;

		const {status, message} = await UpdateProductService.handleSimpleUpdate(product, "name", name);

		return res.status(status).json(message);
	}

	async updateProductDescription(req, res) {
		const {product} = req;
		const {description} = req.body;

		const {status, message} = await UpdateProductService.handleSimpleUpdate(product, "description", description);

		return res.status(status).json(message);
	}

	async updateProductPrice(req, res) {
		const {product} = req;
		const {price} = req.body;

		const {status, message} = await UpdateProductService.handleSimpleUpdate(product, "price", price);

		return res.status(status).json(message);
	}

	async updateProductStock(req, res) {
		const {product} = req;
		const {stock} = req.body;

		const {status, message} = await UpdateProductService.handleSimpleUpdate(product, "stock", stock);

		return res.status(status).json(message);
	}
}

export default new UpdateProductController;