<script lang="ts">
	import * as PIXI from 'pixi.js';
	import { NFTLLogo, labelHighScore, btnStart, challengeBtns } from './assets';
	// import NTL1 from './0.json';
	// import NTL2 from './1.json';
	// import NTL3 from './2.json';
	import { onMount } from 'svelte';
	import { animtateBg } from './utils';

	export let inGame;
	export let challenge: boolean;
	export let turtle;
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

	onMount(() => {
		const startBtn = btnStart(w, h);
		const { freeContainer, ChallengeContainer, selected, noAds } = challengeBtns(w, h);

		const logo = NFTLLogo();
		const challengeText = labelHighScore();
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
		};
		init();
		const ticker = new PIXI.Ticker();
		ticker.add(animate);
		ticker.start();

		function animate() {
			const pipeSpeed = 2;
			challengeText.x -= 1;

			animtateBg(sky, ground, clouds, town, bushes, pipeSpeed);

			if (turtle) {
				// async load that's why we check here
				turtle.x = -40;
				turtle.y = 135;
				stage.addChild(turtle);
			}
			const bounds = challengeText.getBounds();
			if (challengeText.x < -bounds.width) {
				challengeText.x = w + 20;
			}
			stage.addChild(ground);
			stage.addChild(challengeText);
			renderer.render(stage);
		}
	});
</script>
