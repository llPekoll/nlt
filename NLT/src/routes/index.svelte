<script context="module" lang="ts">
	export const prerender = true;

	export async function load({ page, fetch, session, context }) {
		const res = await fetch('/query/trads');
		return {
			props: {
				trad: await res.json()
			}
		};
	}
</script>
<script lang="ts">
    import Hero from "$lib/Hero.svelte";
	import Share from '$lib/Share.svelte';
	import About from '$lib/About.svelte';

    export let trad;
	console.log(trad)
</script>


<Hero />
<About {trad}/>
<Share />