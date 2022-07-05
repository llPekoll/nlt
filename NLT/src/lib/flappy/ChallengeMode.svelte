<script>
	import * as PIXI from 'pixi.js';
	import { NineSlicePlane, onTick, Text, Container } from 'svelte-pixi';

	export let x;
	export let y;
	export let challengeMode;
	let width = 140;
	let height = 55;
	let y1 = 0;
	let y2 = 0;
	const btnOn = PIXI.Texture.from('/flappy/button.png');
	const btnOff = PIXI.Texture.from('/flappy/buttonOff.png');
	const clicked = (yCliked) => {
		yCliked += 50;
	};
	const handleChallenge = (val) => {
		challengeMode = val;
		y1 = 0;
		y2 = 0;
	};
</script>

<Container {x} {y}>
	<Container
		x="2"
		y={y1}
		interactive
		on:pointerup={() => {
			clicked(y1);
		}}
		on:pointerdown={() => {
			handleChallenge(true);
		}}
	>
		<NineSlicePlane
			texture={challengeMode ? btnOn : btnOff}
			leftWidth={6}
			topHeight={14}
			rightWidth={6}
			bottomHeight={15}
			{width}
			{height}
			pivot={{ x: width / 2, y: height / 2 }}
		/>
		<Text anchor={0.5} text="Challenge" style={{ fill: 'red', fontFamily: 'VT323' }} />
        <Text
		anchor={0.2}
		text="300NFTL"
    scale={.5}
		style={{ fill: 'white', fontFamily: 'VT323' }}
		x=0
		y=25
	/>
	</Container>
	<Container
		x="-200"
		y={y2}
		interactive

		on:pointerup={() => {
			clicked(y2);
		}}
		on:pointerdown={() => {
			handleChallenge(false);
		}}
	>
		<NineSlicePlane
			texture={challengeMode ? btnOff : btnOn}
			leftWidth={6}
			topHeight={14}
			rightWidth={6}
			bottomHeight={15}
			{width}
			{height}
			pivot={{ x: width / 2, y: height / 2 }}
		/>
		<Text anchor={0.5} text="Free to play" style={{ fill: 'red', fontFamily: 'VT323' }} />
        <Text
		anchor={0.5}
    scale={.5}
		text="With Ads if not NFT"
		style={{ fill: 'white', fontFamily: 'VT323' }}
		x=0
		y=25
	/>
	</Container>
</Container>
