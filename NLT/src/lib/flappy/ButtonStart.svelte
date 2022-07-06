<script>
    import * as PIXI from 'pixi.js'
    import { NineSlicePlane, onTick, Text, Container } from 'svelte-pixi'
  
    export let x;
    export let y;
    export let inGame;
    let width = 140
    let height = 55
    let counter = 0

        const startGame = () =>{
            inGame = true;
        }
  </script>
<Container {x} {y}>
    <NineSlicePlane
      texture={PIXI.Texture.from('/flappy/button.png')}
      leftWidth={6}
      topHeight={14}
      rightWidth={6}
      bottomHeight={15}
      {width}
      {height}
      pivot={{ x: width / 2, y: height / 2}}
      interactive
      on:pointerdown={startGame}
      
    />
    <Text
    anchor={0.5}
    text="Start!"
    style={{ fill: 'red', fontFamily: 'VT323' }}
  />
</Container>