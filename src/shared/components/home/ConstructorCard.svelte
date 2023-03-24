<script>
	import { fly } from 'svelte/transition';

	let visible = false;

	function toggleVisibility() {
		visible = !visible;
	}

	export let title, description, image, notReversed, column;
</script>

<div style="background: url({image}) no-repeat; transform: scaleY({notReversed});">
	<div style="transform: scaleY({notReversed}); flex-direction: {column}"  on:mouseenter={toggleVisibility} on:mouseleave={toggleVisibility} >
		<h5>{title}</h5>
			<p>{description}</p>
			<!--{#if visible}-->
			<!--	{#key title}-->
			<!--		<button in:fly={{ x: -10, duration: 200, delay: 200 }} out:fly={{ x: 5, duration: 200 }}>-->
			<!--			<p>Перейти</p>-->
			<!--		</button>-->
			<!--	{/key}-->
			<!--{/if}-->
	</div>
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: space-between;

		width: 390px;
		height: 527px;

		box-shadow: 0 0 24px 4px rgba(0, 0, 0, 0.25);

		border-radius: 16px;
	}

	h5 {
		color: white;
		font-weight: 900;
		font-size: 36px;

		margin: 0;

		padding: 36px;

		width: 80%;

		text-align: right;
	}

	p {
		padding: 36px;
		margin: 0;

		font-weight: 800;
		font-size: 28px;
	}

	.description {
		display: flex;
		height: 140px;
		transition: .2s;

		&:hover {
			height: 180px;
		}
	}

	button {
		width: 100%;
		height: 60px;

		p {
			padding: 20px;
		}
	}
</style>