<script>
	import * as PIXI from 'pixi.js';
	import { AnimatedSprite, onTick, Text, Container } from 'svelte-pixi';

    export let w;
    export let h;
    export let pressed;

    let y = h/2;
    let x;
    let gratity = .2
    let lift =-7;
    let velocity=0;
    // let 
	onTick((delta) => {
        if (pressed){
            console.log(pressed)
            velocity += lift;
            velocity += 0.8;
            pressed=false;
        }
        velocity += gratity
        y += velocity;
        if (y>h){
            y=h
            velocity=0
        }
	});
</script>

<svelte:window bind:innerWidth={w} bind:innerHeight={h} />

<Container>
	<AnimatedSprite
		textures={[
			PIXI.Texture.from('/flappy/anim/frame-1.png'),
			PIXI.Texture.from('/flappy/anim/frame-2.png'),
			PIXI.Texture.from('/flappy/anim/frame-3.png'),
			PIXI.Texture.from('/flappy/anim/frame-4.png')
		]}
		playing
		animationSpeed={0.1}
		x=150
        {y}
		anchor={0.5}
		scale={0.1}
	/>
</Container>
