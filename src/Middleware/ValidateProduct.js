import ProductRepository from "../modules/Product/ProductRepository.js";

const _productRepository = new ProductRepository;

export default async function ValidateProduct(req, res, next) {
	const {product_id} = req.headers;

	const product = await _productRepository.findProductById(product_id);

	if (! product)
		return res.status(404).json({error: "product cannot found"});

	req.product = product;
	next();
}