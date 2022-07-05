<script>
    import * as PIXI from 'pixi.js'
    import { NineSlicePlane, onTick, Text, Container } from 'svelte-pixi'
  
    export let x;
    export let y;
    export let w;
    let height = 150
    let counter = 0
    const toWin = 'To win: 1rst:6000NFTL,  2nd:2000NFTL,   3rd:1000NFTL'
    const winners = 'ScoreBoard:,  1rst:23, 0x..345,  2nd:12, 0x..876,  3rd:08, 0x..432'
    let x1 = w+100
    let x2 = w+1000
    onTick((delta) =>{

        x1 -= 2  * delta
        x2 -= 2  * delta
        if(x1<-1000){x1 = w+100}
        if(x2<-1000){x2 = w+100}
  })
  </script>
<Container {x} {y}>
    <NineSlicePlane
      texture={PIXI.Texture.from('/flappy/button.png')}
      leftWidth={6}
      topHeight={14}
      rightWidth={6}
      bottomHeight={15}
      width = {w+100}
      {height}
      pivot={{ x: 50+(w / 2), y: height / 2}}
    />
    <Text
        text={toWin}
        y=-40
        x={x1}
        style={{ fill: 'red', fontFamily: 'VT323' }}
        />
        <Text
        text={winners}
        y=-40
        x={x2}
        style={{ fill: 'red', fontFamily: 'VT323' }}
    />
</Container>