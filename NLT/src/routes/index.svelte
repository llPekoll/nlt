<script lang="ts">
    import Hero from "$lib/Hero.svelte";
	import Share from '$lib/Share.svelte';
	import About from '$lib/About.svelte';
	import Connect from "$lib/Connect.svelte";
	import Mint from "$lib/Mint.svelte";

    export let trad;
	
	let connected = false
</script>

{#if connected}
	<Hero />
	<Mint />
	<About {trad}/>
	<Share {trad}/>
{:else}
	<Connect bind:connected/>
{/if}

