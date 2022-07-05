<script>
	import { TilingSprite, onTick, getApp } from 'svelte-pixi';
	import * as PIXI from 'pixi.js';

	let w;
	let h;

	const { app } = getApp();

	let count = 0;
	let scale = { x: 1, y: 1 };
	let tilePosition = { x: 0, y: 0 };

	onTick((delta) => {
		count += 0.01 * delta;
		tilePosition = { x: tilePosition.x - 1.2, y: 0 };
	});
</script>

<svelte:window bind:innerWidth={w} bind:innerHeight={h} />

<TilingSprite
	texture={PIXI.Texture.from('/flappy/bg.png')}
	{tilePosition}
	{scale}
	width={w}
	height={h}
/>
