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
    export let trad;
</script>

<Hero />
<!-- {trad.hero.heroTittle} -->
