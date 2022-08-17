<script lang="ts">
	import { onMount } from 'svelte';

	import * as PIXI from 'pixi.js';
	import { NFTLLogo, labelHighScore, btnStart, challengeBtns, NFTCard } from './assets';
	import { animtateBg, NFTCounter } from './utils';

	import NTL1 from '$lib/0.json';
	import NTL2 from '$lib/1.json';
	import NTL3 from '$lib/2.json';

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

	let tier1Nb = 0;
	let tier2Nb = 0;
	let tier3Nb = 0;

	onMount(async () => {
		if (window.ethereum) {
			const { tier1Nb, tier2Nb, tier3Nb } = await NFTCounter(window.ethereum);
		}

		const startBtn = btnStart(w, h);
		const { freeContainer, ChallengeContainer, selected, noAds } = challengeBtns(w, h);

		const logo = NFTLLogo();
		const challengeText = labelHighScore();
		const challengeTextData = await fetch('/query/week');
		const higestscore = await fetch('/query/highscore');
		const dataScore = await challengeTextData.json();
		const higscore = await higestscore.json();
		`Highest score:${higscore.score} 
		PRICE -> 
		1: ${dataScore.first_bounty}NFTL, 
		2: ${dataScore.second_bounty}NFTL, 
		3: ${dataScore.third_bounty}NFTL      
		SCORE-> 
		1: ${dataScore.first_score}Pts, ${dataScore.first_wallet}, 
		2: ${dataScore.second_score}Pts, ${dataScore.second_wallet}, 
		3: ${dataScore.third_score}Pts, ${dataScore.third_wallet}`;
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
			locked: !Boolean(tier1Nb)
		};
		const nft1 = NFTCard(nft1Data, h / 4, 10);

		const nft2Data = {
			id: NTL2.nft_id,
			image: NTL2.image,
			name: NTL2.name,
			lives: 2,
			priceDiscount: 0,
			locked: !Boolean(tier2Nb)
		};
		const nft2 = NFTCard(nft2Data, h / 4, w / 3);

		const nft3Data = {
			id: NTL3.nft_id,
			image: NTL3.image,
			name: NTL3.name,
			lives: 3,
			priceDiscount: 0,
			locked: !Boolean(tier3Nb)
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
			if (challenge) inGame = true;
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
