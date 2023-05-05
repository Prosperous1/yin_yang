import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async ({ parent }) => {
	const { supabase, session } = await parent();
	if (!session) {
		throw redirect(303, '/');
	}

	let { data: user} = await supabase
		.from('user')
		.select('user_uuid')
		.eq(
			'user_uuid',
			session.user.id
		)

	if (user?.length === 0) {
		const { data, error } = await supabase
			.from('user')
			.insert([{
				favorite_id: null,
				order_id: null,
				cart_id: null,
				first_name: 'Change',
				last_name: 'Me',
				rating: '1',
				profile_picture_url: 'sample_url',
				user_uuid: session.user.id
			},])
	}

	let {data: userInfo} = await supabase
		.from('user')
		.select('*')
		.eq(
			'user_uuid',
			session.user.id
		).single()

	console.log(userInfo)

	return {
		user: session.user,
		userInfo: userInfo,
	};
};
