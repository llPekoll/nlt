<script>
	import { TilingSprite, onTick, Loader } from 'svelte-pixi';
	import * as PIXI from 'pixi.js';

	export let speed;
	

	let w;
	let h;
	let tilePosition = { x: 0, y: 0 };
	onTick((delta) => {
		tilePosition = { x: tilePosition.x - speed/1.1, y: 0 };
	});
</script>

<svelte:window bind:innerWidth={w} bind:innerHeight={h} />
<Loader resources={['/flappy/sprite.json']}>
  <TilingSprite
    texture={PIXI.Texture.from('bg_bushes_0.png')}
    {tilePosition}
    
    
    width={w}
    height={h}
  />
</Loader>
