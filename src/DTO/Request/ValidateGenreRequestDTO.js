export default function ValidateGenreRequestDTO(genre) {
	if (genre === "MASCULINO" ) 
		return true;

	if (genre === "FEMININO")
		return true;

	return false;
}