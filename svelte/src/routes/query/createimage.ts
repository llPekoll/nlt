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
	console.log('==== Post Image /--/ S3 Bucket =====');
	const data: FormData = await request.formData();
	const root = env.VITE_S3_ROOT;
	const tokenId = data.get('tokenId');
	const file: File = data.get('image');
	const fileName = `${root}/${tokenId}_${file.name}`.replace(/\s/g, '');
	const fileBlob: Buffer = Buffer.from(await file.arrayBuffer());
	const payload = {
		Bucket: env.VITE_BUCKET,
		Key: fileName,
		Body: fileBlob,
		ACL: 'public-read'
	};
	await s3.putObject(payload, function (err, data) {
		if (err) {
			console.log('image not posted', err);
		} else {
			console.log('image => posted', data);
		}
	});

	return { status: 200 };
};
