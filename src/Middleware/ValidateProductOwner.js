export default async function ValidateProduct(req, res, next) {
	const {user, product} = req;

	if (product.user_id.toString() != user._id.toString())
		return res.status(401).json({error: "not authorized"});
	
	next();
}