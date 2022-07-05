<script>
	import * as PIXI from 'pixi.js';
	import { AnimatedSprite, onTick, Text, Container } from 'svelte-pixi';

	let w;
	// let h
	let h = 470;
	let y = 80;
	let count = 0;
	onTick((delta) => {
		count += delta * 0.05;
		y = y + Math.cos(count) * 0.1;
	});
</script>

<svelte:window bind:innerWidth={w} bind:innerHeight={h} />

<Container x={w / 2 + 30} {y}>
	<Text anchor={0.5} text="NLT Fly's" style={{ fill: 'white', fontFamily: 'VT323' }} x="-40" />
	<AnimatedSprite
		textures={[
			PIXI.Texture.from('/flappy/anim/frame-1.png'),
			PIXI.Texture.from('/flappy/anim/frame-2.png'),
			PIXI.Texture.from('/flappy/anim/frame-3.png'),
			PIXI.Texture.from('/flappy/anim/frame-4.png')
		]}
		playing
		animationSpeed={0.1}
		x="50"
		anchor={0.5}
		scale={0.1}
	/>
</Container>
