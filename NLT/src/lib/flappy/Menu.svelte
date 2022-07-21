<script lang="ts">
	import * as PIXI from 'pixi.js';
	import { NFTLLogo, labelHighScore, btnStart } from './assets';
	// import NTL1 from './0.json';
	// import NTL2 from './1.json';
	// import NTL3 from './2.json';
	import { onMount } from 'svelte';
	import { animtateBg } from './utils';

	export let inGame;
	export let challenge;
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
		const logo = NFTLLogo();
		const challengeText = labelHighScore();
		startBtn.on('pointerup', () => {
			turtle.y = 135;
			inGame = true;
		});

		const init = () => {
			stage.addChild(sky);
			stage.addChild(clouds);
			stage.addChild(town);
			stage.addChild(bushes);
			stage.addChild(startBtn);
			stage.addChild(logo);

			if (turtle) {
			}
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

<div class="flex items-center justify-center">
	<canvas id="theMenu" />
</div>
