<script lang='ts'>
	import * as PIXI from 'pixi.js';
	import Game from '$lib/flappy/Game.svelte';
	import Menu from '$lib/flappy/Menu.svelte';
	// 	import NTL1 from './0.json';
	// 	import NTL2 from './1.json';
	// 	import NTL3 from './2.json';
	let inGame = false;
	let challenge = false;
	let turtle;
	
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
		turtle.play();

		turtle.x = -20;
		turtle.y = 135;
		turtle.scale.x = 0.5;
		turtle.scale.y = 0.5;
		turtle.name = 'turtle'

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

</script>

{#if inGame}
	<Game bind:inGame {challenge} {turtle}/>
{:else}
	<Menu bind:inGame bind:challenge {turtle}/>
{/if}
