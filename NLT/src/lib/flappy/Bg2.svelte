<script>
	import { TilingSprite, onTick, Loader } from 'svelte-pixi';
	import * as PIXI from 'pixi.js';

	let w;
	let h;

	let scale = { x: 1, y: 1 };
	let tilePosition = { x: 0, y: 0 };

	onTick((delta) => {
		tilePosition = { x: tilePosition.x - 1.2, y: 0 };
	});
</script>

<svelte:window bind:innerWidth={w} bind:innerHeight={h} />
<Loader resources={['/flappy/sprite.json']}>
  <TilingSprite
	texture={PIXI.Texture.from('bg_sky_0.png')}
	{tilePosition}
	{scale}
	width={w}
	height={h}
  />
</Loader>