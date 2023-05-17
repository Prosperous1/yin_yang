<script>
	import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";

	export let title, description, count, weight, price, image_url, category;
	import { createClient } from '@supabase/supabase-js'

	const supabaseUrl = PUBLIC_SUPABASE_URL
	const supabaseAnonKey = PUBLIC_SUPABASE_ANON_KEY

	const supabase = createClient(supabaseUrl, supabaseAnonKey);


	// const user = await getUser();
	// export let product;
	//
	// async function addToFavorites() {
	// 	// Вставьте информацию о товаре в таблицу "Избранное"
	// 	const { data, error } = await supabase
	// 		.from('favorites')
	// 		.insert({ product_id: product.id,user_id: user[0].id });
	//
	// 	if (error) {
	// 		console.error(error);
	// 	} else {
	// 		console.log('Товар успешно добавлен в избранное!');
	// 	}
	// }
	//
</script>

<div class="container">
	<img src={image_url} alt="Product Image">
	<div class="over_pic">
		<p class="count">{count} шт.</p>
		<p class="count">{category.title}</p>
	</div>
	<div class="card_inner">
		<div class="title_bar">
			<p class="title">{title}</p>
			<p class="weight">{weight} гр.</p>
		</div>
		<p class="description">{description}</p>
	</div>
	<button class="like_btn" >
		<img src="icons/ui/heart.svg" alt="Add to Favourite">
	</button>
	<button class="price_btn">
		<span>{price} ₽</span>
	</button>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		position: relative;

		padding-bottom: 105px;

		margin-bottom: 67px;

		width: 318px;

		background: #FFFFFF;
		box-shadow: 0 12px 21px rgba(0, 0, 0, 0.25);
		border-radius: 18px;
	}

	.card_inner {
		padding: 20px 24px;

		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.title_bar {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	p {
		font-weight: 900;
		margin: 0;
	}

	.count {
		padding: 8px 12px;

		font-size: 18px;
		color: white;

		background: rgba(21, 21, 21, 0.85);
		backdrop-filter: blur(2px);
		border-radius: 9px;
	}

	.over_pic {
		display: flex;
		gap: 20px;
		position: absolute;

		top: 125px;
		left: 26px;
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
		font-size: 18px;

		color: rgba(0, 0, 0, 0.6);
		line-height: 23px;
	}

	.like_btn {
		bottom: 95px;
		left: 24px;
		margin-left: 24px;
		padding: 5px 8px;
		width: 15%;

		border-radius: 10px;
	}

	.price_btn{
		position: absolute;
		bottom: 0;
		padding: 24px 124px;

		width: 100%;

		box-shadow: 0 -14px 24px 4px rgba(0, 0, 0, 0.1);
		border-radius: 18px;

		color: white;
		font-size: 24px;
	}

	button {
		background: #030303;

		transition: .3s;

		&:hover {
			background: rgba(0, 0, 0, 0.85);
		}
	}
</style>
