import {supabase} from "./lib/supabase";

export async function load() {
	const { data: products, error } = await supabase
		.from('product')
		.select(`
			*,
			category (
			  title
			)
		  `)

	return {
		products: products ?? [],
	};
}
