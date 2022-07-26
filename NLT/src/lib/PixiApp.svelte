<script lang="ts">
	import * as PIXI from 'pixi.js';
	import Game from '$lib/flappy/Game.svelte';
	import Menu from '$lib/flappy/Menu.svelte';
	import { onMount } from 'svelte';
	import { Ads } from '$lib/flappy/assets';
	import { animationLoader } from '$lib/flappy/utils';

	let inGame: boolean = false;
	let selectedNFT: number = 1;
	let challenge: boolean = false;
	let turtle: PIXI.AnimatedSprite;
	let karen: PIXI.AnimatedSprite;
	let punk: PIXI.AnimatedSprite;
	const debug: boolean = true;
	let livesUsed: number = 0;

	let w: number = 288;
	let h: number = 512;
	let renderer;
	let ads;
	onMount(async () => {
		const canvas = document.getElementById('theGame');
		renderer = new PIXI.Renderer({
			view: canvas,
			width: w,
			height: h,
			resolution: window.devicePixelRatio,
			autoDensity: true
		});

		const loader = PIXI.Loader.shared;
		const handleLoadComplete = () => {
			const texture1 = loader.resources.sheet.spritesheet;
			turtle = animationLoader(texture1, 'turtle');
			const texture2 = loader.resources.sheet_karen.spritesheet;
			karen = animationLoader(texture2, 'karen');
			const texture3 = loader.resources.sheet_punk.spritesheet;
			punk = animationLoader(texture3, 'punk');
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
		loader.add('sheet_karen', '/flappy/karen.json');
		loader.add('sheet_punk', '/flappy/punk.json');
		loader.onComplete.once(handleLoadComplete);
		loader.onProgress.add(handleLoadProgess);
		loader.onLoad.add(handleLoadAsset);
		loader.onError.add(handleLoadError);
		loader.load();
		ads = await Ads(w, h);
	});
	const cloudsTexture = PIXI.Texture.from('/flappy/clouds.png');
	const townTexture = PIXI.Texture.from('/flappy/town.png');
	const bushesTexture = PIXI.Texture.from('/flappy/bushes.png');
	const groundTexture = PIXI.Texture.from('/flappy/assets/ground-sprite.png');
	const skyTexture = PIXI.Texture.from('/flappy/sky.png');

	const sky = new PIXI.TilingSprite(skyTexture, w, h);
	const clouds = new PIXI.TilingSprite(cloudsTexture, w, h);
	const town = new PIXI.TilingSprite(townTexture, w, h);
	const bushes = new PIXI.TilingSprite(bushesTexture, w * 2, h);
	const ground = new PIXI.TilingSprite(groundTexture, w, h);

	const turtleGraphics = new PIXI.Graphics();
	turtleGraphics.beginFill(0xff3300, 0.25);
	turtleGraphics.lineStyle(1, 0xffd900, 1);
	turtleGraphics.moveTo(0, 67);
	turtleGraphics.lineTo(40, 67);
	turtleGraphics.lineTo(40, 0);
	turtleGraphics.lineTo(0, 0);
	turtleGraphics.scale.y = 0.5;
	turtleGraphics.scale.y = 0.5;
	if (!debug) {
		turtleGraphics.alpha = 0;
	}

	bushes.scale.x = 0.6;
	bushes.scale.y = 0.6;
	bushes.y = 145;
	ground.y = 450;
	let stage = new PIXI.Container();

	$: if (inGame) {
		stage.destroy();
		stage = new PIXI.Container();
		stage.name = 'stage';
	} else {
		stage.destroy();
		stage = new PIXI.Container();
		stage.name = 'stage';
	}
	let toDisp;
	$: if (selectedNFT == 1) {
		toDisp = turtle;
	} else if (selectedNFT == 2) {
		toDisp = punk;
	} else if (selectedNFT == 3) {
		toDisp = karen;
	}
</script>

{#if inGame}
	<Game
		bind:inGame
		{challenge}
		{selectedNFT}
		turtle={toDisp}
		{karen}
		{punk}
		{sky}
		{clouds}
		{town}
		{bushes}
		{ground}
		{turtleGraphics}
		{renderer}
		{stage}
		{livesUsed}
		{ads}
	/>
{:else}
	<Menu
		bind:inGame
		bind:challenge
		bind:selectedNFT
		turtle={toDisp}
		{sky}
		{clouds}
		{town}
		{bushes}
		{ground}
		{renderer}
		{stage}
	/>
{/if}

<div class="flex items-center justify-center">
	<canvas id="theGame" />
</div>
