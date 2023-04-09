<script lang="ts">
	import { fly } from 'svelte/transition';

	import PopUp from "./service/PopUp.svelte";


	let visible = false;

	function toggleVisibility() {
		visible = !visible;
	}

	let isOpen = false;

	function swapPopup() {
		isOpen = !isOpen;
	}

	export let link, title, icon, color, isButton;
</script>

{#if !isButton}
	<a href="{link}" class="btn_container" on:mouseenter={toggleVisibility} on:mouseleave={toggleVisibility}>
		<img src={icon} alt={link}>
		{#if visible}
			<p style="color: {color}" transition:fly={{ x: -50, duration: 500 }}>{title}</p>
		{/if}
	</a>
	{:else}
		<button on:click={swapPopup}>Open Pop-up</button>
		<PopUp {isOpen} on:close={swapPopup}>
			<h2>Pop-up Header</h2>
			<p>Pop-up content goes here.</p>
		</PopUp>
{/if}



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
			width: 160px;
			background: rgba(211, 211, 211, 0.40);
		}

		p {
			text-align: center;
			padding-right: 10px;
		}
	}
</style>
