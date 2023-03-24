<script>
	export let filterItems;
</script>

<div>
	{#each filterItems as item}
		<p>{item}</p>
	{/each}
</div>

<style>
	div {
		display: flex;
		gap: 24px;
	}
	p{
		padding: 8px 23px;
		font-weight: 800;
		font-size: 20px;

		background: #EFEFEF;
		border-radius: 8px;

		box-shadow: 0 0 24px 4px rgba(0, 0, 0, 0.25);
	}
</style>