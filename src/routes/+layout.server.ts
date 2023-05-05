import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getSession }, url: {pathname} }) => {
	return {
		pathname,
		session: getSession()
	};
};
