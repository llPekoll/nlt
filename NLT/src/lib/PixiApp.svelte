<script>
	import { Application, Text } from 'svelte-pixi';
	import Bg from '$lib/flappy/Bg.svelte';
	import Ground from '$lib/flappy/Ground.svelte';
	import Title from '$lib/flappy/Title.svelte';
	import Card from '$lib/flappy/Card.svelte';
  import ButtonStart from './flappy/ButtonStart.svelte';
  import FlashInfo from './flappy/FlashInfo.svelte';
  import NoNFTBtn from './flappy/NoNFTBtn.svelte';
  import ChallengeMode from './flappy/ChallengeMode.svelte';
	import NTL1 from './0.json';
	import NTL2 from './1.json';
	import NTL3 from './2.json';

	let app;
	let h = 0;
	let w = 0;
	let nftSelected = 0;
	let nltChosen = `NLT choosen 0`;
  let challengeMode = false;
	$: if (app && h && h) {
		app.renderer.resize(w, h);
	}

	$: nltChosen = `NLT choosen ${nftSelected}`;
  
</script>

<svelte:window bind:innerWidth={w} bind:innerHeight={h} />

<Application bind:instance={app}  backgroundColor="0x33A5FF">
	<Bg />
	<Ground />
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
  <ChallengeMode bind:challengeMode x={w/2} y=450/>
  <ButtonStart x={h/2} y=500 />
  <FlashInfo x={h/2} y={h} w={w}/>
</Application>
