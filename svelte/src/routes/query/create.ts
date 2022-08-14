import { env } from '$lib/env';
import axios from 'axios';
import AWS from 'aws-sdk';

import type  {RequestHandler}  from '@sveltejs/kit';


const spacesEndpoint = new AWS.Endpoint(env.VITE_ENDPOINT);
const s3 = new AWS.S3({
	endpoint: spacesEndpoint,
	accessKeyId: env.VITE_SPACES_KEY,
	secretAccessKey: env.VITE_SPACES_SECRET
});

export const get:RequestHandler = async () => {
	const errors:[] = [];
	return {
		body: {
			errors
		}
	};
};

export const post:RequestHandler = async ({ request }) => {
    console.log('====== Login =======');
	const data:FormData = await request.formData();
    const root = env.VITE_S3_ROOT
    const tokenId = data.get('tokenId');  
    const file:File = data.get('image');
    const fileName = `${root}/${tokenId}_${file.name}`.replace(/\s/g, '');;
    const jasonName = `${root}/00${tokenId}.json`;
    const fileBlob:Buffer = Buffer.from(await file.arrayBuffer());
    const name = data.get('name');  
    const price = data.get('price');  
    const description = data.get('description');  
    
    let payload = {
        Bucket: env.VITE_BUCKET,
        Key: fileName,
        Body: fileBlob,
        ACL: 'public-read'
    };
    await s3.putObject(payload, function (err, data) {
		if (err) {
			console.log('not posted', err);
		} else {
			console.log('posted', data);
        }
    })
    payload['Key'] = jasonName
    const jason = { 
        name, 
        description,
        price,
        image:`${env.VITE_CDN_URL}/${fileName}`}
    payload['Body'] = Buffer.from(JSON.stringify(jason));
    await s3.putObject(payload, function (err, data) {
		if (err) {
			console.log('not posted', err);
		} else {
			console.log('posted', data);
        }
    })

    console.log('response')
	try{
        // const url = `${env.VITE_BACKEND_DNS}/nfts`;
		// const response = await axios.post(url, data);
        
		return {
			status: 201,
			body: {location:`${env.VITE_CDN_EXPOSE_URL}/${jasonName}`}
		};
	} catch (e){
			return { status: 403, body: {errors:e.response.data.error.message} }
	}
};
