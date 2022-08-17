import { env } from '$lib/env';
import AWS from 'aws-sdk';
import type { RequestHandler } from '@sveltejs/kit';

const spacesEndpoint = new AWS.Endpoint(env.VITE_ENDPOINT);
const s3 = new AWS.S3({
	endpoint: spacesEndpoint,
	accessKeyId: env.VITE_SPACES_KEY,
	secretAccessKey: env.VITE_SPACES_SECRET
});

export const get: RequestHandler = async () => {
	const errors: [] = [];
	return {
		body: {
			errors
		}
	};
};

export const post: RequestHandler = async ({ request }) => {
	console.log('==== Post Json /--/ Post Back end =====');
	const data = await request.json();
	const root = env.VITE_S3_ROOT;
	const tokenId = data.tokenId;
	const attributes = data.attributes;
	let image = data.image;
	const fileName = `${root}/${tokenId}_${image}`.replace(/\s/g, '');
	const jasonName = `${root}/00${tokenId}.json`;
	const name = data.name;
	const price = data.price;
	const creator = data.creator;
	const description = data.description;
	const tags = data.tags;
	const collection = data.collection;
	const isListed = data.isListed;
	const tokenUri = `${env.VITE_CDN_EXPOSE_URL}/${jasonName}`;
    image = `${env.VITE_CDN_URL}/${fileName}`;

	const jason = {
		name,
		attributes,
		creator,
		description,
		price,
		tags,
		collection,
		image,
		isListed,
		tokenId,
		tokenUri
	};
	console.log(jason);

	fetch(`${env.VITE_BACKEND_DNS}/nfts`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(jason)
	});
	const payload = {
		Bucket: env.VITE_BUCKET,
		Key: jasonName,
		Body: Buffer.from(JSON.stringify(jason)),
		ACL: 'public-read'
	};
	await s3.putObject(payload, function (err, data) {
		if (err) {
			console.log('json => not posted!!!', err);
		} else {
			console.log('json => posted', data);
		}
	});
	return {
		status: 200,
		body: { location: `${env.VITE_CDN_EXPOSE_URL}/${jasonName}` }
	};
};
