<script>
	export let title, description, image, notReversed, column;
</script>

<div style="background: url({image}) no-repeat; transform: scaleY({notReversed});">
	<div style="transform: scaleY({notReversed}); flex-direction: {column} !important">
		<h5>{title}</h5>
		<p>{description}</p>
	</div>
</div>

<style>
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

		font-weight: 800;
		font-size: 28px;
	}
</style>