import type {PageLoad} from "../../../.svelte-kit/types/src/routes/$types";
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
				first_name: 'Change',
				last_name: 'Me',
				rating: '1',
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

	let {data: userAddresses} = await supabase
		.from('delivery_address')
		.select('*')
		.eq(
			'user_id',
			userInfo.id
		)

	let {data: userFavorite} = await supabase
		.from('favorite')
		.select("*, product_id(*, category_id(title))")
		.eq(
			'user_id',
			userInfo.id
		)

	let {data: userCart} = await supabase
		.from('cart_item')
		.select("*, product_id(*, category_id(title))")
		.eq('user_id', [userInfo.id])

	let {data: userOrderitem} = await supabase
		.from('order_item')
		.select("*, product_id")
		.eq(
			'user_id',
			[userInfo.id]
		)


	let {data: userOrder} = await supabase
		.from('order')
		.select("*, user_id")
		.eq(
			'user_id',
			[userInfo.id]
		)

	const userProfile = {
		userInfo: userInfo,
		userAddresses: userAddresses,
		userFavorite: userFavorite,
		userCart: userCart,
		userOrderitem: userOrderitem,
		userOrder:userOrder
	}

	return {
		user: session.user,
		userProfile: userProfile,
	};
}