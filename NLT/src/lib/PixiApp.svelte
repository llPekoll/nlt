<script lang="ts">
	import * as PIXI from 'pixi.js';
	import Game from '$lib/flappy/Game.svelte';
	import Menu from '$lib/flappy/Menu.svelte';
	import { onMount } from 'svelte';
	import { Ads } from '$lib/flappy/assets';

	// 	import NTL1 from './0.json';
	// 	import NTL2 from './1.json';
	// 	import NTL3 from './2.json';
	let inGame: boolean = false;
	let challenge: boolean = false;
	let init: boolean = false;
	let turtle: PIXI.AnimatedSprite;
	const debug: boolean = true;
	let livesUsed: number = 0;

	let w: number = 288;
	let h: number = 512;
	let renderer;
	onMount(() => {
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
			const texture = loader.resources.sheet.spritesheet;
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
			turtle.x = -100;
			turtle.y = 95;
			turtle.play();

			turtle.scale.x = 0.5;
			turtle.scale.y = 0.5;
			turtle.name = 'turtle';
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
		loader.onComplete.once(handleLoadComplete);
		loader.onProgress.add(handleLoadProgess);
		loader.onLoad.add(handleLoadAsset);
		loader.onError.add(handleLoadError);
		loader.load();
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
	Ads(stage, w, h);

	$: if (inGame) {
		init = true;

		stage.destroy();
		stage = new PIXI.Container();

		stage.name = 'stage';
	} else {
		stage.destroy();
		stage = new PIXI.Container();
		stage.name = 'stage';
	}
</script>

{#if inGame}
	<Game
		bind:inGame
		{challenge}
		{turtle}
		{sky}
		{clouds}
		{town}
		{bushes}
		{ground}
		{turtleGraphics}
		{renderer}
		{stage}
		{livesUsed}
	/>
{:else}
	<Menu
		bind:inGame
		bind:challenge
		{turtle}
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
