import axios from 'axios';
import { env } from '$lib/env';

export async function get(): any {
	const url = `${env.VITE_BACKEND_DNS}/week`;
	const response = await axios.get(url);
	return {
		body: response.data
	};
}
