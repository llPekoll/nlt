<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				tittle: `${status}: ${error.message}`
			}
		};
	}
</script>

<script>
	export let tittle;
</script>

<h1>
	{tittle}
</h1>
