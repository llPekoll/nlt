<script>


  import { Application, Text } from "svelte-pixi";
  // import Title from './comps/Title.svelte'
  // import Card from './comps/Card.svelte'
  // import Bg from './comps/Bg.svelte'
  // import Ground from './comps/Ground.svelte'
  

  
  let app
  let h =0;
  let w =0;
  let nftSelected=0;
  let nltChosen = `NLT choosen 0`
  $: if (app && h && h) {
    app.renderer.resize(w, h)
  }

  $: nltChosen = `NLT choosen ${nftSelected}`

</script>
<svelte:window bind:innerWidth={w} bind:innerHeight={h} />




<Application bind:instance={app} antialias backgroundColor='0x33A5FF'>
  <!-- <Bg />
  <Ground />
  <Title />
  <Text text={nltChosen} style={{ fill: 'black',fontFamily: 'VT323'}} x={w/2} y ={100}/>
  <Card name='jose' x={(w/2)-100} y={h/2}  id=1 bind:nftSelected/>
  <Card name='mmd' x={(w/2)} y={h/2}  id=2 bind:nftSelected/>
  <Card name='kamel' x={(w/2)+100} y={h/2}  id=3 bind:nftSelected/> -->
</Application>