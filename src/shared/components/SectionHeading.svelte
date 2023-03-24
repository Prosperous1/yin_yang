<script>
	export let title, icon;
</script>

<div>
	<img src={icon} alt={title}>
	<h3>{title}</h3>
</div>

<style>
	div {
		display: flex;
		gap: 24px;
		align-items: center;
	}

	h3 {
		font-weight: 900;
		font-size: var(--font-size);
		margin: 0;
	}
</style>