import { fail, redirect } from '@sveltejs/kit';
import {page} from "$app/stores";




export const actions = {
	update: async ({ request, locals: { supabase, getSession } }) => {
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

	insert:async ({request, locals: { supabase, getUser} })=>{
		const formData = await request.formData();
		const address = formData.get('address') as string;


		const user = await getUser();

		console.log(user)

		const { data, error } = await supabase
			.from('delivery_address')
			.insert([
				{ address: address, user_id: user[0].id },
			])

		if (error) {
			return fail(500, {
				address,
			});
		}

		return {
			address,
		};
	},

	// insertt:async ({request, locals:{supabase} })=>{
	// 	const formData = await request.formData();
	// 	const email = formData.get('email') as string;
	// 	const phone = formData.get('pfone') as string;
	//
	// 	const { error } = await supabase
	// 	.from('authentication')
	// 		.insert([		{
	// 			email: email,
	// 			phone: phone
	// 		}])
	// 	if (error) {
	// 		return fail(500, {
	// 			email,
	// 			phone
	// 		});
	// 	}
	//
	// 	return {
	// 		email,
	// 		phone
	// 	};
	// }

};
