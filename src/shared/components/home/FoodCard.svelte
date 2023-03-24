<script>
	export let title, description, count, weight, price, image;
</script>

<div class="container">
	<img src={image} alt="Product Image">
	<p class="count">{count} шт.</p>
	<div class="title_bar">
		<p class="title">{title}</p>
		<p class="weight">{weight} гр.</p>
	</div>
	<p class="description">{description}</p>
	<button class="like_btn">
		<img src="icons/ui/heart.svg" alt="Add to Favourite">
	</button>
	<button class="price_btn">{price} ₽</button>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		position: relative;

		margin-bottom: 67px;

		width: 318px;
		height: 469px;

		background: #FFFFFF;
		box-shadow: 0 12px 21px rgba(0, 0, 0, 0.25);
		border-radius: 18px;
	}

	.title_bar {
		display: flex;
		align-items: center;
		gap: 16px;

		padding: 20px 24px;
	}

	p {
		font-weight: 900;
		margin: 0;
	}

	.count {
		position: absolute;

		top: 125px;
		left: 26px;

		padding: 8px 12px;

		font-size: 18px;
		color: white;

		background: rgba(21, 21, 21, 0.85);
		backdrop-filter: blur(2px);
		border-radius: 9px;
	}

	.title {
		font-size: 24px;
		color: black;
	}

	.weight {
		font-size: 18px;
		color: rgba(0, 0, 0, 0.7);
	}

	.description {
		display: flex;
		padding: 0 24px;

		font-size: 18px;

		color: rgba(0, 0, 0, 0.6);
		line-height: 23px;
	}

	.like_btn {
		position: absolute;
		bottom: 95px;
		left: 24px;
		padding: 5px 8px;

		background: #030303;
		border-radius: 10px;
	}

	.price_btn{
		position: absolute;
		bottom: 0;
		padding: 24px 124px;

		width: 100%;

		background: black;
		box-shadow: 0 -14px 24px 4px rgba(0, 0, 0, 0.1);
		border-radius: 18px;

		color: white;
		font-size: 24px;
	}
</style>