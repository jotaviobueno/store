import UpdateProductService from "./UpdateProductService.js";

class UpdateProductController {
 
	async updateProductName(req, res) {
		const {product} = req;
		const {name} = req.body;

		const {status, message} = await UpdateProductService.handleSimpleUpdate(product, "name", name);

		return res.status(status).json(message);
	}
}

export default new UpdateProductController;