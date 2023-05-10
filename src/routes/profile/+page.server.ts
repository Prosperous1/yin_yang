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
	update: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();
		const fullName = formData.get('fullName') as string;
		const lastName = formData.get('lastName') as string;
		const phone = formData.get('phone') as string;


		const session = await getSession();

		const { error } = await supabase.from('user').upsert({
			id: session?.user.id,
			first_name: fullName,
			last_name: lastName,
			phone,

			updated_at: new Date()
		});


		if (error) {
			return fail(500, {
				fullName,
				lastName,
				phone,

			});
		}

		return {
			fullName,
			lastName,
			phone,

		};
	},
	signout: async ({ locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (session) {
			await supabase.auth.signOut();
			throw redirect(303, '/');
		}
	}
};