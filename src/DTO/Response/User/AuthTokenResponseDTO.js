export default function UserResponseDTO(token) {
	return {
		token: token.token,
		status: token.status,
		email: token.email,
		token_generated_for: token.token_generated_for,
		expires_at: token.expires_at,
		created_at: token.created_at,
	};
}