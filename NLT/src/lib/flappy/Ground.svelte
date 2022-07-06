<script>
	import { TilingSprite, onTick, getApp, Text } from 'svelte-pixi';
	import * as PIXI from 'pixi.js';

	export let speed;
  const { app } = getApp();
	

	let w;
	let h;
	let count = 0;
	let scale = { x: 1, y: 1 };
	let tilePosition = { x: 0, y: 0 };
	let instance;
	onTick((delta) => {
		count += 0.01 * delta;
		tilePosition = { x: tilePosition.x - speed, y: 0 };
	});
</script>

<svelte:window bind:innerWidth={w} bind:innerHeight={h} />

<TilingSprite
  y=70
	texture={PIXI.Texture.from('/flappy/ground.png')}
	{tilePosition}
	{scale}
	width={w}
	height={h}
/>
