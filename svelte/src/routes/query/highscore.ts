import axios from 'axios';
import { env } from '$lib/env';

export const GET = async () => {
	const url = `${env.VITE_BACKEND_DNS}/highestscore`;
	const response = await axios.get(url);
	return {
		body: response.data
	};
};
