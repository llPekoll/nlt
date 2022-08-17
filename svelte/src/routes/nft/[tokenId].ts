/** @type {import('@sveltejs/kit').RequestHandler} */

export const get = async ({ params }) => {
	console.log(params.tokenId);
	const tokenId = params.tokenId;
	const env = import.meta.env;
	const res = await fetch(`${env.VITE_BACKEND_DNS}/trads`);
	const res2 = await fetch(`${env.VITE_BACKEND_DNS}/nft/${tokenId}`);
	const trad = await res.json();
	const nft = await res2.json();
	return {
		body: {
			trad,
			nft,
			tokenId
		}
	};
};
