/** @type {import('@sveltejs/kit').RequestHandler} */

export const get = async () => {
	const env = import.meta.env;
	const res = await fetch(`${env.VITE_BACKEND_DNS}/trads`);
	const res2 = await fetch(`${env.VITE_BACKEND_DNS}/nfts/1`);
	const trad = await res.json();
	const nfts = await res2.json();
	return {
		body: {
			trad,
			nfts
		}
	};
};
