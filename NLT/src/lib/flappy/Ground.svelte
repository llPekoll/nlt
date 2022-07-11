<script>
	import { TilingSprite, onTick, Loader, Text } from 'svelte-pixi';
	import * as PIXI from 'pixi.js';
  

	export let speed;
  
	export let h

	let w;
	let tilePosition = { x: 0, y: h };
	onTick((delta) => {
		tilePosition = { x: tilePosition.x - speed, y:h };
	});
  
</script>

<svelte:window bind:innerWidth={w} bind:innerHeight={h} />
<Loader resources={['/flappy/sprite.json']}>
    <TilingSprite
      texture={PIXI.Texture.from('bg_ground_0.png')}
      {tilePosition}
      width={w}
      height={h}
    />
</Loader> 