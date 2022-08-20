/** @type {import('@sveltejs/kit').RequestHandler} */

export const get = async ({ params }) => {
    const env = import.meta.env;
	const tokenId = params.tokenId;
	const res2 = await fetch(`${env.VITE_BACKEND_DNS}/nft/${tokenId}`);
	const nft = await res2.json();
	return {
		body: {
			nft,
		}
	};
};

export const patch = async ({ params, request }) => {
	const tokenId = params.tokenId;
	const env = import.meta.env;
	fetch(`${env.VITE_BACKEND_DNS}/nft/${tokenId}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(await request.json())
	});
	return {
		body: { success: true }
	};
};
