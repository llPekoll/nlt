import { env } from '$lib/env';
import NLTNFT from '$lib/NLTNFT.json';

export const NFTCounter = async (ethereum): [tier1Nb: number, tier2Nb: number, tier3Nb: number] => {
	let tier1Nb: number;
	let tier2Nb: number;
	let tier3Nb: number;
	const accounts = await ethereum
		.request({
			method: 'eth_requestAccounts'
		})
		.catch((err) => {
			console.log(err.code);
		});
	const account = accounts[0];
	const provider = new ethers.providers.Web3Provider(ethereum);
	const signer = provider.getSigner();
	const contract = new ethers.Contract(env.VITE_CONTRACT_NUMBER, NLTNFT.abi, signer);
	console.log(account);
	// TODO:
	// Make an array and push that into an array instead
	tier1Nb = await contract.balanceOf(account, 0);
	tier2Nb = await contract.balanceOf(account, 1);
	tier3Nb = await contract.balanceOf(account, 2);
	tier1Nb = ethers.utils.formatUnits(tier1Nb, 0);
	tier1Nb = parseInt(tier1Nb);
	tier2Nb = ethers.utils.formatUnits(tier2Nb, 0);
	tier2Nb = parseInt(tier2Nb);
	tier3Nb = ethers.utils.formatUnits(tier3Nb, 0);
	tier3Nb = parseInt(tier3Nb);
	return {
		tier1Nb,
		tier2Nb,
		tier3Nb
	};
};
