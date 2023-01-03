export default function SessionResponseDTO(session) {
	return {
		session_id: session.session_id,
		email: session.email,
		expires_at: session.expires_at,
		created_at: session.created_at,
	};
}