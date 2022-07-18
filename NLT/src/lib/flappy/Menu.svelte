<script lang="ts">
	import * as PIXI from 'pixi.js';
	import { NFTLLogo } from './assets';
	// import NTL1 from './0.json';
	// import NTL2 from './1.json';
	// import NTL3 from './2.json';
	import { onMount } from 'svelte';

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
	
	PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
	
	const loader = PIXI.Loader.shared;
	const stage = new PIXI.Container();
	
	onMount(() => {
		const canvas = document.getElementById('theMenu');
		const renderer = new PIXI.Renderer({
			view: canvas,
			width: w,
			height: h,
			resolution: window.devicePixelRatio,
			autoDensity: true
		});
		
		const ticker = new PIXI.Ticker();
		ticker.add(animate);
		ticker.start();
		
		let challengeText;
		let containerBtnStart: PIXI.Container;
		
		const styleChal = new PIXI.TextStyle({
			fontSize: 12,
			fill: '#FFFFFF',
			stroke: '#000000',
			strokeThickness: 2,
			fontFamily: 'Press Start 2P',
			fontWeight: 'bold',
			dropShadow: true,
			dropShadowColor: '#000000'
		});

		const startGame = (up) => {
			if (up) containerBtnStart.y += 3;
			else containerBtnStart.y -= 3;
		};
		const startGame2 = () => {
			inGame = true;
		};
		containerBtnStart = new PIXI.Container();
		const startBtn = new PIXI.NineSlicePlane(PIXI.Texture.from('/flappy/btn.png'), 4, 4, 4, 6);
		const startText = new PIXI.Text('Start', styleChal);
		startText.x = 35;
		startText.y = 5;

		startBtn.height = 30;
		startBtn.height = 30;
		startBtn.width = 130;
		containerBtnStart.interactive = true;
		containerBtnStart.buttonMode = true;

		containerBtnStart.on('pointerdown', () => {
			startGame(true);
		});
		containerBtnStart.on('pointerup', startGame2);
		containerBtnStart.on('pointerupoutside', () => {
			startGame(false);
		});

		containerBtnStart.addChild(startBtn);
		containerBtnStart.addChild(startText);
		containerBtnStart.x = w / 2 - containerBtnStart.getBounds().width / 2;
		containerBtnStart.y = h / 2;

		stage.addChild(sky);
		stage.addChild(clouds);
		stage.addChild(town);
		stage.addChild(bushes);
		stage.addChild(ground);
		stage.addChild(containerBtnStart);
		const logo = NFTLLogo();
		stage.addChild(logo);

		challengeText = new PIXI.Text('f', styleChal);
		challengeText.name = 'chal';
		challengeText.y = 480;
		challengeText.x = 500;
		challengeText.text =
			'PRICE -> 1:3409NFTL, 2:213NFTL, 3: 90NFTL      SCORE-> 1: 13Pts, 0x03..23, 2: 5Pts, 0x03..23, 3: 4Pts, 0x03..23';
		stage.addChild(challengeText);

		function animate() {
			const pipeSpeed = 2;
			sky.tilePosition.x -= 0.1 * pipeSpeed;
			ground.tilePosition.x -= 1 * pipeSpeed;
			clouds.tilePosition.x -= 0.5 * pipeSpeed;
			town.tilePosition.x -= 0.7 * pipeSpeed;
			bushes.tilePosition.x -= 0.8 * pipeSpeed;
			challengeText.x -= 1;
			const jsim = stage.getChildByName('turtleMenu');
			if(jsim){
				console.log("jsim")
				console.log(jsim)
				stage.removeChild(jsim);
				stage.addChild(jsim);
			}
			if(turtle){

				stage.addChild(turtle);
			}
			renderer.render(stage);
		}
	});
</script>

<div class="flex items-center justify-center">
	<canvas id="theMenu" />
</div>
