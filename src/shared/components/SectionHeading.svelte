<script>
	export let title, icon;
</script>

<div>
	<img src={icon} alt={title}>
	<h3>{title}</h3>
</div>

<style lang="scss">
	div {
		display: flex;
		gap: 24px;
		align-items: center;
		@media (max-width: 767px) {
			flex-direction: column;
			align-items: flex-start;
			gap: 12px;
		}
	}

	h3 {
		font-weight: 900;
		font-size: var(--font-size);
		margin: 0;
		@media (max-width: 767px) {
			font-size: var(--font-size);
		}
	}
</style>