<script lang="ts">
    
	import Share from '$lib/Share.svelte';
	import Connect from "$lib/Connect.svelte";
	import Mint from "$lib/Mint.svelte";

    export let trad;
	
	let connected = false
</script>

{#if connected}
	
	<Mint />
	<Share {trad}/>
{:else}
	<Connect bind:connected/>
{/if}

