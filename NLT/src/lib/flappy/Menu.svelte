<script lang="ts">
	import * as PIXI from 'pixi.js';
	import { NFTLLogo } from './assets';
	// import NTL1 from './0.json';
	// import NTL2 from './1.json';
	// import NTL3 from './2.json';
	import { onMount } from 'svelte';

	export let inGame;

	PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
	let w: number = 288;
	let h: number = 512;
	let bushes: PIXI.TilingSprite;
	let sky: PIXI.TilingSprite;
	let clouds: PIXI.TilingSprite;
	let texture;
	let town: PIXI.TilingSprite;
	let ground: PIXI.TilingSprite;
	let turtle;
	let challengeText;
	let containerBtnStart: PIXI.Container;

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

		const handleLoadComplete = () => {
			texture = loader.resources.sheet.spritesheet;
			const textures = [
				texture.textures['bg 0.ase'],
				texture.textures['bg 1.ase'],
				texture.textures['bg 2.ase'],
				texture.textures['bg 1.ase']
			];
			turtle = new PIXI.AnimatedSprite(textures);
			turtle.animationSpeed = 0.1;
			turtle.anchor.x = 0.5;
			turtle.anchor.y = 0.5;
			turtle.play();

			stage.addChild(turtle);

			turtle.x = -20;
			turtle.y = 135;
			turtle.scale.x = 0.5;
			turtle.scale.y = 0.5;
			stage.addChild(turtle);
		};
		const handleLoadAsset = (loader, resource) => {
			console.log(`asset Loaded, ${resource.name}`);
		};
		const handleLoadError = (loader, resource) => {
			console.log('load error');
		};
		const handleLoadProgess = (loader, resource) => {
			console.log(`${loader.progress}%`);
		};
		loader.add('sheet', '/flappy/turtle.json');
		loader.onComplete.add(handleLoadComplete);
		loader.onProgress.add(handleLoadProgess);
		loader.onLoad.add(handleLoadAsset);
		loader.onError.add(handleLoadError);
		loader.load();

		const ticker = new PIXI.Ticker();
		ticker.add(animate);
		ticker.start();

		const cloudsTexture = PIXI.Texture.from('/flappy/clouds.png');
		const townTexture = PIXI.Texture.from('/flappy/town.png');
		const bushesTexture = PIXI.Texture.from('/flappy/bushes.png');
		const groundTexture = PIXI.Texture.from('/flappy/assets/ground-sprite.png');
		const skyTexture = PIXI.Texture.from('/flappy/sky.png');
		sky = new PIXI.TilingSprite(skyTexture, w, h);
		clouds = new PIXI.TilingSprite(cloudsTexture, w, h);
		town = new PIXI.TilingSprite(townTexture, w, h);
		bushes = new PIXI.TilingSprite(bushesTexture, w * 2, h);
		bushes.scale.x = 0.6;
		bushes.scale.y = 0.6;
		bushes.y = 145;
		ground = new PIXI.TilingSprite(groundTexture, w, h);
		ground.y = 450;

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
			renderer.render(stage);
		}
	});
</script>

<div class="flex items-center justify-center">
	<canvas id="theMenu" />
</div>
