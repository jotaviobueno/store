class ProductResponseDTO {
	
	treatOnlyOneProduct(product) {
		return {
			name: product.name,
			description: product.description,
			product_id: product.product_id,
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

	treatManyProducts(products) {
		return products.map(product => this.treatOnlyOneProduct(product));
	}
}

export default new ProductResponseDTO;