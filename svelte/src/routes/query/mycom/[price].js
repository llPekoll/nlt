/** @type {import('@sveltejs/kit').RequestHandler} */

export const get = async ({ params }) => {
	console.log(params.tokenId);
	const price = params.price;
	const env = import.meta.env;
	const res = await fetch(`${env.VITE_BACKEND_DNS}/mycom/${price}`);
	const value = await res.json();
	return {
		body: {
			value,
		}
	};
};
