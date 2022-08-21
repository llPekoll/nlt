<script lang="ts">
	import Connect from '$lib/Connect.svelte';
	import Mint from '$lib/Mint.svelte';
	let connected = false;
</script>

{#if connected}
	<Mint />
{:else}
	<Connect bind:connected />
{/if}
