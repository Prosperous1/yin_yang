import {supabase} from "./lib/supabase.js";

export async function load() {

	const { data: product, error } = await supabase
		.from('product')
		.select(`
    *,
    category (
      title
    )
  `)

	return {
	products: product ?? [],
};
}