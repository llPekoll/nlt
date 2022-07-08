<script>
	import * as PIXI from 'pixi.js';
	import { AnimatedSprite, onTick, Text, Container, Loader } from 'svelte-pixi';

    export let w;
    export let h;
    export let pressed;
    export let xTurtle;
    export let yTurtle;
    export let gameOver;


    let y = h/2;
    let gratity = .6
    let lift =-15;
    let velocity=0;
    const x = 300
	onTick((delta) => {
        if(!gameOver){
            if (pressed){
                velocity += lift;
                velocity += 0.9;
                pressed=false;
            }
        }
        velocity += gratity
        y += velocity;
        if (y>h-150){
            y=h-150
            velocity=0
        }
        xTurtle = x
        yTurtle = y
	});
</script>

<svelte:window bind:innerWidth={w} bind:innerHeight={h} />

    <Loader resources={['/flappy/sprite.json']}>
        <AnimatedSprite
            textures={[
                PIXI.Texture.from('bg_turtle_0.png'),
                PIXI.Texture.from('bg_turtle_1.png'),
            ]}
            playing
            animationSpeed={0.1}
            {x}
            {y}
            anchor={0.5}
            
        />
    </Loader>
    