<script>
	import { Application, Text, Container } from 'svelte-pixi';
	import Bg from '$lib/flappy/Bg.svelte';
	import Ground from '$lib/flappy/Ground.svelte';
	import Title from '$lib/flappy/Title.svelte';
	import Card from '$lib/flappy/Card.svelte';
  import ButtonStart from './flappy/ButtonStart.svelte';
  import FlashInfo from './flappy/FlashInfo.svelte';
  import NoNFTBtn from './flappy/NoNFTBtn.svelte';
  import ChallengeMode from './flappy/ChallengeMode.svelte';
  import Turtle from './flappy/Turtle.svelte';
  import Pipe from './flappy/Pipe.svelte';
  import Bush from './flappy/Bush.svelte';
	import NTL1 from './0.json';
	import NTL2 from './1.json';
	import NTL3 from './2.json';
import Town from './flappy/Town.svelte';
import Clouds from './flappy/Clouds.svelte';
  
  let app;
	let h = 0;
	let w = 0;
  let speed = 1.5;
	let nftSelected = 0;
  let inGame = false;
  let pressed = false;
  let challengeMode = false;
  let score=0
  let gameOver = false;
  let xTurtle =0;
  let yTurtle;
	$: if (app && h && h) {
		app.renderer.resize(w, h);
	}

	$: nltChosen = `NLT choosen ${nftSelected}`;
  
</script>

<svelte:window bind:innerWidth={w} bind:innerHeight={h} />
<!-- <FPS /> -->
<Application bind:instance={app}  backgroundColor="0x33A5FF">
  <!-- menu -->
  {#if !inGame}
  <Container>

    <Ground bind:speed bind:score/>
    <Title />
    <Text
      anchor={0.5}
      text="Chose your NFT"
      style={{ fill: 'black', fontFamily: 'VT323' }}
      x={w / 2}
      y="130"
    />
    <Card nft={NTL1} x={w / 2 - 150} y={180} id="1" bind:nftSelected />
    <Card nft={NTL2} x={w / 2 - 20} y={180} id="2" bind:nftSelected />
    <Card nft={NTL3} x={w / 2 + 100} y={180} id="3" bind:nftSelected />
    <NoNFTBtn x={5 + w / 2} y="370" />
    <ChallengeMode bind:challengeMode x={w/2} y=430/>
    <ButtonStart x={w/2} y=500 bind:inGame/>
    <FlashInfo x={w/2} y={h} w={w}/>
  </Container>
  {:else}
  <Container>
    <Bg bind:pressed/>
    <Clouds bind:speed/>
    <Town bind:speed/>
    <Bush bind:speed/>
    <Turtle bind:pressed {w} {h} bind:xTurtle bind:yTurtle bind:gameOver/>
    <Pipe {w} {h} bind:speed {xTurtle} {yTurtle} bind:score bind:gameOver/>
    <Ground bind:speed bind:score/>

  </Container>
  {/if}
</Application>
