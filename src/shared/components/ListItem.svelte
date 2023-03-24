<script>
	export let link, title;
</script>

<li>
	<a href={link}>{title}</a>
</li>

<style lang="scss">
	li {
		list-style: none;
	}

	a {
		color: rgba(255, 255, 255, 0.70);
		font-weight: 700;
		font-size: 18px;
		text-decoration: none;

		margin-bottom: 10px;

		transition: .3s;

		&:hover {
			color: rgba(255, 255, 255, 0.95);
		}
	}
</style>
