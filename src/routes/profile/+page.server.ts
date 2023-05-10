import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}


	const { data: user } = await supabase
		.from('user')
		.select(`first_name, last_name`)
		.eq('id', session.user.id)
		.single();

	return { session, user };
};

export const actions = {
	default: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();
		const firstName = formData.get('firstName') as string;
		const lastName = formData.get('lastName') as string;

		const session = await getSession();

		console.log(session.user.id)

		const { error } = await supabase
			.from('user')
			.update({
				first_name: firstName,
				last_name: lastName,
			})
			.eq('user_uuid', session.user.id);


		if (error) {
			return fail(500, {
				firstName,
				lastName,
			});
		}

		return {
			firstName,
			lastName,
		};
	},
};
