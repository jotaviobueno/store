export default function UserResponseDTO(user) {
	return {
		first_name: user.first_name,
		last_name: user.last_name,
		username: user.username,
		email: user.email,
		avatar_url: user.avatar_url,
		genre: user.genre,
		birth_date: user.birth_date,  
	};
}