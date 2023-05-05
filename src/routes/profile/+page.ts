import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async ({ parent }) => {
	const { supabase, session } = await parent();
	if (!session) {
		throw redirect(303, '/');
	}
	const { data, error } = await supabase
		.from('user')
		.insert([
				{ favorite_id: null,
					order_id: null,
					cart_id: null,
					first_name: 'Change',
					last_name: 'Me',
					rating: '1',
					profile_picture_url: 'sample_url',
					user_uuid: session.user.id
				},
		])


	return {
		user: session.user,
	};
};
