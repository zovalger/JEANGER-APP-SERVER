export default function toUpperCamelCase(str: string) {
	let texto = str.trim().toLowerCase();

	return texto
		.replace(/[-_\s]+(.)?/g, (_, c) => (c ? ` ${c.toUpperCase()}` : ""))
		.replace(/^./, texto.charAt(0).toUpperCase());
}
