<script lang="ts">
	import { fly } from 'svelte/transition';

	let visible = false;

	function toggleVisibility() {
		visible = !visible;
	}

	export let link, icon;
</script>

<a href="/{link}" class="btn_container" on:mouseenter={toggleVisibility} on:mouseleave={toggleVisibility}>
	<img src={icon} alt={link}>
	{#if visible}
		<p transition:fly={{ x: -50, duration: 500 }}>{link.toUpperCase()}</p>
	{/if}
</a>

<style lang="scss">
	.btn_container {
		display: flex;
		align-items: center;
		gap: 10px;

		transition: .3s;

		border-radius: 12px;

		background: rgba(0, 0, 0, 0.70);

		text-decoration: none;
		color: white;

		font-size: 20px;

		padding: .5em;
		width: 46px;
		height: 46px;

		&:hover {
			width: 150px;
		}

		p {
			text-align: center;
		}
	}
</style>