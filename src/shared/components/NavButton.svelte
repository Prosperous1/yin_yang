<script lang="ts">
	import { fly } from 'svelte/transition';

	let visible = false;

	function toggleVisibility() {
		visible = !visible;
	}

	export let link, title, icon, color;
</script>

<a href="{link}" class="btn_container" on:mouseenter={toggleVisibility} on:mouseleave={toggleVisibility}>
	<img src={icon} alt={link}>
	{#if visible}
		<p style="color: {color}" transition:fly={{ x: -50, duration: 500 }}>{title}</p>
	{/if}
</a>

<style lang="scss">
	.btn_container {
		display: flex;
		align-items: center;
		gap: 10px;

		transition: .3s;

		border-radius: 12px;

		text-decoration: none;

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