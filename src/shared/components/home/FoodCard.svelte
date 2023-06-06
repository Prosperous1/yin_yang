<script>
	import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";
	import { createClient } from "@supabase/supabase-js";
	import { page } from "$app/stores";
	const supabaseUrl = PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = PUBLIC_SUPABASE_ANON_KEY;
	const supabase = createClient(supabaseUrl, supabaseAnonKey);
	export let title, description, count, weight, price, image_url, category, PageData, id;
	let isFav = false;
	let isInCart = false;

	async function setFavStatus() {
		isFav = await isFavorite($page.data.dbUser.data.id, id);
	}
	async function setCartStatus() {
		isInCart = await isInUserCart($page.data.dbUser.data.id, id);
	}

	async function isInUserCart(userId, productId) {
		const { data, error } = await supabase
			.from("cart_item")
			.select()
			.eq("user_id", userId)
			.eq("product_id", productId);
		if (error) {
			console.log(error);
			return false;
		}
		return data.length > 0;
	}
	async function toggleCart(userId, productId) {
		if (isInCart) {
			await removeFromCart(userId, productId);
		} else {
			await addToCart(userId, productId);
		}
		setCartStatus();
	}

	async function addToFavorites(userId, productId) {
		const { error } = await supabase.from("favorite").insert({
			user_id: userId,
			product_id: productId,
		});
		if (error) {
			console.log(error);
			return null;
		}
		isFav = true;
		setFavStatus();
	}
	// Функция добавления товара в корзину
	async function addToCart(userId, productId) {
		const { error } = await supabase.from("cart_item").insert({
			user_id: userId,
			product_id: productId,
		});
		if (error) {
			console.log(error);
			return null;
		}
		const button = document.querySelector(`.price_btn[data-id="${productId}"]`);
		button.disabled = false;
		button.textContent = "Удалить из корзины";
		button.removeEventListener("click", addToCart);
		button.addEventListener("click", () => removeFromCart($page.data.dbUser.data.id, id));
	}

	// Функция удаления товара из корзины
	async function removeFromCart(userId, productId) {
		const { error } = await supabase
			.from("cart_item")
			.delete()
			.eq("user_id", userId)
			.eq("product_id", productId);
		if (error) {
			console.log(error);
			return null;
		}
		const button = document.querySelector(`.price_btn[data-id="${productId}"]`);
		button.disabled = false;
		button.textContent = `${price} ₽`;
		button.removeEventListener("click", removeFromCart);
		button.addEventListener("click", () => addToCart(userId, productId));
	}

	async function removeFromFavorites(userId, productId) {
		const { error } = await supabase
			.from("favorite")
			.delete()
			.eq("user_id", userId)
			.eq("product_id", productId);
		if (error) {
			console.log(error);
			return null;
		}
		isFav = false;
		setFavStatus();
	}

	async function isFavorite(userId, productId) {
		const { data, error } = await supabase
			.from("favorite")
			.select()
			.eq("user_id", userId)
			.eq("product_id", productId);
		if (error) {
			console.log(error);
			return false;
		}
		return data.length > 0;
	}
</script>

<div class="container">
	<img src={image_url} alt="Product Image" />
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
	{#if $page.data.dbUser}
		{#await setFavStatus() then _}
			{#if isFav}
				<button
					class="unlike_btn"
					on:click={removeFromFavorites($page.data.dbUser.data.id, id)}
					hidden={!isFav}
				>
					<img src="icons/ui/union.svg" alt="Remove to Favourite" />
				</button>
			{:else}
				<button
					class="like_btn"
					on:click={addToFavorites($page.data.dbUser.data.id, id)}
					hidden={isFav}
				>
					<img src="icons/ui/heart.svg" alt="Add to Favourite" />
				</button>
			{/if}
		{/await}
		{#await setCartStatus() then _}
			<button
				class="{isInCart ? 'price_btn delete-btn' : 'price_btn'}"
				data-id="{id}"
				on:click={() => toggleCart($page.data.dbUser.data.id, id)}
			>
				{isInCart ? "Удалить из корзины" : `${price} ₽`}
			</button>
		{/await}
	{/if}
</div>
<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		position: relative;

		padding-bottom: 105px;

		margin-bottom: 67px;
		margin-right: 140px;

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
	.unlike_btn{
		bottom: 95px;
		left: 24px;
		margin-left: 24px;
		padding: 5px 8px;
		width: 15%;
		height: 45px;

		border-radius: 10px;
		background: #af0d0d;

		img{
			width: 60px;
			height: 60px;
		}
	}

	.price_btn{
		position: absolute;
		bottom: 0;
		padding: 24px 124px;

		width: 100%;

		box-shadow: 0 -14px 24px 4px rgba(0, 0, 0, 0.1);
		border-radius: 18px;

		color: white;
		font-size: 22px;
	}
	img{
		border-radius: 16px 16px 0px 0px;
	}

	button {
		background: #030303;

		transition: .3s;

		&:hover {
			background: rgba(0, 0, 0, 0.85);
		}
	}

	.delete-btn {
		background-color: rgba(168, 26, 26, 0.93);
		bottom: 0;
		padding: 20px 60px;
		color: white;
		border: none;
		width: 100%;
		border-radius: 18px;
		font-size: 22px;
		cursor: pointer;
	}
</style>
