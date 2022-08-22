<script lang="ts">
	export let link = '/tips';
</script>

<a sveltekit:prefetch href={link}>
	<div class="wrapper">
		<div class="icon facebook">
			<div class="tooltip">Back</div>
			<svg width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m10.875 19.3l-6.6-6.6q-.15-.15-.213-.325Q4 12.2 4 12t.062-.375q.063-.175.213-.325l6.6-6.6q.275-.275.687-.288q.413-.012.713.288q.3.275.313.687q.012.413-.288.713L7.4 11h11.175q.425 0 .713.287q.287.288.287.713t-.287.712Q19 13 18.575 13H7.4l4.9 4.9q.275.275.288.7q.012.425-.288.7q-.275.3-.7.3q-.425 0-.725-.3Z"></path></svg>
		</div>
	</div>
</a>

<style>
	.wrapper .icon {
		position: relative;
		background-color: #ffffff;
		border-radius: 50%;
		padding: 15px;
		margin: 10px;
		width: 50px;
		height: 50px;
		font-size: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
		cursor: pointer;
		transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	}

	.wrapper .tooltip {
		position: absolute;
		top: 0;
		font-size: 14px;
		background-color: #ffffff;
		color: #ffffff;
		padding: 5px 8px;
		border-radius: 5px;
		box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
		opacity: 0;
		pointer-events: none;
		transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	}

	.wrapper .tooltip::before {
		position: absolute;
		content: '';
		height: 8px;
		width: 8px;
		background-color: #ffffff;
		bottom: -3px;
		left: 50%;
		transform: translate(-50%) rotate(45deg);
		transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	}

	.wrapper .icon:hover .tooltip {
		top: -45px;
		opacity: 1;
		visibility: visible;
		pointer-events: auto;
	}

	.wrapper .icon:hover span,
	.wrapper .icon:hover .tooltip {
		text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
	}

	.wrapper .facebook:hover,
	.wrapper .facebook:hover .tooltip,
	.wrapper .facebook:hover .tooltip::before {
		background-color: #333;
		color: #ffffff;
	}
</style>
