<script lang="ts">
	import NTL1 from './0.json';
	import NTL2 from './1.json';
	import NTL3 from './2.json';
	import Soon from './0soon.json';
	import MintCard from './MintCard.svelte';
</script>

<div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 pt-20 px-10">
	<MintCard nlt={NTL1} id="0" price=".1" />
	<MintCard nlt={NTL2} id="1" price=".2" />
	<MintCard nlt={NTL3} id="2" price=".4" />
	<MintCard nlt={Soon} id="999" price="90000" />
</div>
