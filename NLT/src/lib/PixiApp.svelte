<script>
	import * as PIXI from 'pixi.js';
	import Game from '$lib/flappy/Game.svelte';
	import Menu from '$lib/flappy/Menu.svelte';
	// 	import NTL1 from './0.json';
	// 	import NTL2 from './1.json';
	// 	import NTL3 from './2.json';
	

	let inGame = false;
	let challenge = false;

    
</script>

{#if inGame}
	<Game bind:inGame {challenge}/>
{:else}
	<Menu bind:inGame bind:challenge/>
{/if}