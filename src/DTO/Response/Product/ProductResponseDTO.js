export default function ProductResponseDTO(product) {
	return {
		name: product.name,
		description: product.description,
		price: product.price,
		discount: `%${product.discount}`,
		stock: product.stock,
		category: product.category,
		product_images: product.product_images, 
		is_active: product.is_active,
		created_at: product.created_at,
		updated_at: product.updated_at,
		reviews: product.reviews,
	};
}