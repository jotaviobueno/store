import ProductService from "./ProductService.js";

class ProductController {

	async createProduct(req, res) {
		const {user} = req;
		const product = {
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			stock: req.body.stock,
			category: req.body.category,
			product_images: req.body.product_images,
		};

		const {status, message} = await ProductService.createProduct(user, product);

		return res.status(status).json(message);
	}

	async showManyProduct(req, res) {
		const {status, message} = await ProductService.showManyProduct();

		return res.status(status).json(message);
	}
}

export default new ProductController;