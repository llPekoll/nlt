<script>
    import { Sprite, onTick } from 'svelte-pixi'
    import * as PIXI from 'pixi.js'
    export let w
    export let speed;
    let x = w
    


    onTick((delta) => {
        x -= speed
	});

  </script>
  
  <Sprite
    texture={PIXI.Texture.from('/flappy/pipe.png')}
    anchor={0.5}
    {x}
    y={200}
  />