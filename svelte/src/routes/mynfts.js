/** @type {import('@sveltejs/kit').RequestHandler} */

export const get = async () => {
	const env = import.meta.env;
	const res = await fetch(`${env.VITE_BACKEND_DNS}/trads`);
	const trad = await res.json();
	return {
		body: {
			trad,
		}
	};
};
