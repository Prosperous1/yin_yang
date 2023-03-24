<script>
	export let link, title;
</script>

<li>
	<a href={link}>{title}</a>
</li>

<style>
	li {
		list-style: none;
	}

	a {
		color: rgba(255, 255, 255, 0.80);
		font-weight: 700;
		font-size: 18px;
		text-decoration: none;

		margin-bottom: 10px;
	}
</style>