<script>
	import * as PIXI from 'pixi.js';
	import { Container, onTick, Sprite, Text } from 'svelte-pixi';
	export let nft;
	export let x;
	export let y;
	export let id;
	export let nftSelected;
	let w;
	let h;
	let instance;
	let scaleHeart;
	y = parseInt(y, 10);

	let count = 0;
	onTick((delta) => {
		count += delta * 0.05 + id / 200;
		y = y + Math.sin(count) * 0.2;
		scaleHeart = 3 + Math.sin(count) / 2;
	});

	const handleDragEnd = () => {
		nftSelected = id;
	};
	const handleDragNo = () => {
		nftSelected = id;
	};
	const img = nft.image.substring(18);
</script>

<svelte:window bind:innerWidth={w} bind:innerHeight={h} />
<Container bind:instance {x} {y}>
	<Sprite
		scale={0.4}
		interactive
		on:pointerup={handleDragEnd}
		texture={PIXI.Texture.from('/flappy/bgcard.png')}
	/>
	<Sprite x="10" y="15" scale={0.165} texture={PIXI.Texture.from(img)} />

	{#if id > 2}
		<Sprite
			x="82"
			y="7"
			scale={0.024 * scaleHeart}
			anchor={0.5}
			texture={PIXI.Texture.from('/flappy/heart.png')}
		/>
	{/if}
	{#if id > 1}
		<Sprite
			x="77"
			y="7"
			scale={0.022 * scaleHeart}
			anchor={0.5}
			texture={PIXI.Texture.from('/flappy/heart.png')}
		/>
	{/if}
	<Sprite
		x="70"
		y="7"
		scale={0.02 * scaleHeart}
		anchor={0.5}
		texture={PIXI.Texture.from('/flappy/heart.png')}
	/>
	<Text
		x="12"
		y="95"
		text={nft.name}
		style={{ fill: 'white', fontFamily: 'VT323', fontSize: '14px' }}
	/>
	<Text
		x="15"
		y="113"
		text={nft.descriptionHTML}
		style={{ fill: 'white', fontFamily: 'VT323', fontSize: '10px' }}
	/>
	{#if id > 2}
		<Sprite
			scale={0.4}
			interactive
			on:pointerup={handleDragNo}
			texture={PIXI.Texture.from('/flappy/cardLock.png')}
		/>
	{/if}
</Container>
