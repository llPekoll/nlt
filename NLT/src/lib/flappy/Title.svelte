<script>
	import * as PIXI from 'pixi.js';
	import { AnimatedSprite, onTick, Text, Container, Loader } from 'svelte-pixi';

	let w;

	let h = 470;
	let y = 0;
	let count = 0;
	onTick((delta) => {
		count += delta * 0.05;
		y = y + Math.cos(count) * 0.1;
	});
</script>

<svelte:window bind:innerWidth={w} bind:innerHeight={h} />


<Loader resources={['/flappy/sprite.json']}>
	<AnimatedSprite
		textures={[
			PIXI.Texture.from('bg_turtle_0.png'),
			PIXI.Texture.from('bg_turtle_1.png'),
			PIXI.Texture.from('bg_turtle_2.png'),
			PIXI.Texture.from('bg_turtle_1.png'),
		]}
		playing
		animationSpeed={0.1}
		{y}
		x={0}
	/>
</Loader>

