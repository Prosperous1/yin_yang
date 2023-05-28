<script>
	export let filterItems;
	// export let selectedCategory;
</script>

<div>
	{#each filterItems as item}
		<button>
			{item}
		</button>
	{/each}
</div>

<style lang="scss">
	div {
		display: flex;
		gap: 24px;
	}

	button {
		padding: 8px 23px;
		font-weight: 800;
		font-size: 20px;

		color: #636363;

		background: #EFEFEF;
		border-radius: 8px;

		transition: .3s;

		&:hover {
			box-shadow: 0 0 14px 3px rgba(0, 0, 0, 0.05);
			background: #bbbbbb;
		}
	}
</style>
