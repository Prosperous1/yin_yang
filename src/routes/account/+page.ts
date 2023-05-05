import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';



export const load: PageLoad = async ({ parent  }) => {
	const { session, supabase } = await parent ();
	if (!session) {
		throw redirect(303, '/');
	}
	const { data: tableData } = await supabase.from('test').select('*');

	return {
		user: session.user,
		tableData
	};
};