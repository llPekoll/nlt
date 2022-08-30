<script lang="ts">
	import '../app.css';
	import Nav from '$lib/Nav.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<main>
	<Nav />
	<slot />
</main>

<style>
	main {
		min-height: 100vh;
	}
</style>
