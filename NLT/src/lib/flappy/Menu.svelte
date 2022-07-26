<script lang="ts">
	import { onMount } from 'svelte';
	import { env } from '$lib/env.js';
	import NLTNFT from '../NLTNFT.json';

	import * as PIXI from 'pixi.js';
	import { NFTLLogo, labelHighScore, btnStart, challengeBtns, NFTCard } from './assets';
	import NTL1 from '../0.json';
	import NTL2 from '../1.json';
	import NTL3 from '../2.json';

	import { animtateBg } from './utils';

	export let inGame: boolean;
	export let selectedNFT: number = 2;
	export let challenge: boolean;
	export let turtle: PIXI.AnimatedSprite;
	export let w: number = 288;
	export let h: number = 512;
	export let bushes: PIXI.TilingSprite;
	export let sky: PIXI.TilingSprite;
	export let clouds: PIXI.TilingSprite;
	export let town: PIXI.TilingSprite;
	export let ground: PIXI.TilingSprite;
	export let renderer: PIXI.Renderer;
	export let stage: PIXI.Container;

	PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
	let tier1 = true;
	let tier2 = true;
	let tier3 = true;

	onMount(async () => {
		// nft detection
		// if (window.ethereum) {
		// 	const accounts = await window.ethereum
		// 		.request({
		// 			method: 'eth_requestAccounts'
		// 		})
		// 		.catch((err) => {
		// 			console.log(err.code);
		// 		});
		// 	const account = accounts[0];
		// 	const provider = new ethers.providers.Web3Provider(window.ethereum);
		// 	const signer = provider.getSigner();
		// 	const contract = new ethers.Contract(env.VITE_CONTRACT_NUMBER, NLTNFT.abi, signer);
		// 	console.log(account);
		// 	// TODO:
		// 	// Make an array and push that into an array instead
		// 	tier1 = await contract.balanceOf(account, 0);
		// 	tier2 = await contract.balanceOf(account, 1);
		// 	tier3 = await contract.balanceOf(account, 2);
		// 	tier1 = ethers.utils.formatUnits(tier1, 0);
		// 	tier1 = parseInt(tier1);
		// 	tier2 = ethers.utils.formatUnits(tier2, 0);
		// 	tier2 = parseInt(tier2);
		// 	tier3 = ethers.utils.formatUnits(tier3, 0);
		// 	tier3 = parseInt(tier3);
		// 	console.log('tier1');
		// 	console.log(tier1);
		// 	console.log(tier2);
		// 	console.log(tier3);
		// }

		const startBtn = btnStart(w, h);
		const { freeContainer, ChallengeContainer, selected, noAds } = challengeBtns(w, h);

		const logo = NFTLLogo();
		const challengeText = labelHighScore();
		const styler: PIXI.TextStyle = new PIXI.TextStyle({
			fontSize: 12,
			fill: '#FFFFFF',
			stroke: '#000000',
			strokeThickness: 2,
			dropShadow: true,
			dropShadowColor: '#000000',
			fontFamily: 'Press Start 2P',
			fontWeight: 'bold'
		});
		const textNLTSected = new PIXI.Text('No NFT Selected', styler);
		textNLTSected.anchor.x = 0.5;
		textNLTSected.x = w / 2;
		textNLTSected.y = h / 2.3;
		const nft1Data = {
			id: NTL1.nft_id,
			image: NTL1.image,
			name: NTL1.name,
			lives: 1,
			priceDiscount: 0,
			locked: !Boolean(tier1)
		};
		const nft1 = NFTCard(nft1Data, h / 4, 10);

		const nft2Data = {
			id: NTL2.nft_id,
			image: NTL2.image,
			name: NTL2.name,
			lives: 2,
			priceDiscount: 0,
			locked: !Boolean(tier2)
		};
		const nft2 = NFTCard(nft2Data, h / 4, w / 3);

		const nft3Data = {
			id: NTL3.nft_id,
			image: NTL3.image,
			name: NTL3.name,
			lives: 3,
			priceDiscount: 0,
			locked: !Boolean(tier3)
		};
		const nft3 = NFTCard(nft3Data, h / 4, w / 1.5);
		nft3.on('pointerup', () => {
			textNLTSected.text = '- NFT3 Selected -';
			nft3.y -= 5;
			selectedNFT = 3;
		});

		nft2.on('pointerup', () => {
			textNLTSected.text = '- NFT2 Selected -';
			nft2.y -= 5;
			selectedNFT = 2;
		});

		nft1.on('pointerup', () => {
			textNLTSected.text = '- NFT1 Selected -';
			nft1.y -= 5;
			selectedNFT = 1;
		});

		startBtn.on('pointerup', () => {
			inGame = true;
			turtle.y = 135;
		});
		freeContainer.on('pointerup', () => {
			freeContainer.y -= 3;
			challenge = false;
			selected.text = 'Selected: \nFree to play';
			noAds.text = '- no Ads if nlt -';
		});
		ChallengeContainer.on('pointerup', () => {
			ChallengeContainer.y -= 3;
			challenge = true;
			selected.text = 'Selected: \nChallenge Mode';
			noAds.text = '';
		});

		const init = () => {
			stage.addChild(sky);
			stage.addChild(clouds);
			stage.addChild(town);
			stage.addChild(bushes);
			stage.addChild(startBtn);
			stage.addChild(freeContainer);
			stage.addChild(ChallengeContainer);
			stage.addChild(selected);
			stage.addChild(logo);
			stage.addChild(nft1);
			stage.addChild(nft2);
			stage.addChild(nft3);
			stage.addChild(textNLTSected);
		};
		init();
		const ticker = new PIXI.Ticker();
		ticker.add(animate);
		ticker.start();

		const ypos = h / 2 - 40;
		let count = 0;
		function animate() {
			count += 0.05;

			const pipeSpeed = 2;
			challengeText.x -= 1;
			animtateBg(sky, ground, clouds, town, bushes, pipeSpeed);

			const bounds = challengeText.getBounds();
			if (turtle) {
				// async load that's why we check here
				turtle.x = w / 2 - 20;
				turtle.y = ypos + Math.cos(count) * 2;
				turtle.scale.x = 0.8;
				turtle.scale.y = 0.8;
				turtle.anchor.x = 0.5;
				turtle.anchor.y = 0.5;
				stage.addChild(turtle);
			}
			if (challengeText.x < -bounds.width) {
				challengeText.x = w + 20;
			}
			if (selectedNFT == 1) {
				const kaka = stage.getChildByName('karen');
				const pupu = stage.getChildByName('punk');
				stage.removeChild(kaka);
				stage.removeChild(pupu);
			}
			if (selectedNFT == 2) {
				const kaka = stage.getChildByName('karen');
				const pupu = stage.getChildByName('turtle');
				stage.removeChild(kaka);
				stage.removeChild(pupu);
			}
			if (selectedNFT == 3) {
				const kaka = stage.getChildByName('turtle');
				const pupu = stage.getChildByName('punk');
				stage.removeChild(kaka);
				stage.removeChild(pupu);
			}
			stage.addChild(ground);
			stage.addChild(challengeText);
			renderer.render(stage);
		}
	});
</script>
