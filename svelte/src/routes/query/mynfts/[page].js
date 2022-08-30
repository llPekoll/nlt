/** @type {import('@sveltejs/kit').RequestHandler} */

export const post = async ({ request, params }) => {
	const data = await request.json();
	const page = params.page;
	const env = import.meta.env;
	const json = JSON.stringify({ address: data.address });
	const res = await fetch(`${env.VITE_BACKEND_DNS}/nfts/${page}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: json
	});
	console.log('nfts');
	const nfts = await res.json();
	console.log(nfts);
	return {
		body: {
			nfts
		}
	};
};
