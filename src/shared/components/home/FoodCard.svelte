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
	let popupEl;
	let productQuantity = 1;

	function showDescription() {
		if (description.length > 100) { // замените 100 на желаемое количество символов
			popupEl.style.display = "block";
		}
	}

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
		const { data, error } = await supabase
			.from("cart_item")
			.select()
			.eq("user_id", userId)
			.eq("product_id", productId);

		if (error) {
			console.log(error);
			return false;
		}

		if (data.length > 0) {
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
		const { data, error } = await supabase
			.from("cart_item")
			.select()
			.eq("user_id", userId)
			.eq("product_id", productId);

		if (error) {
			console.log(error);
			return null;
		}

		if (data.length > 0) {
			// Update existing cart item
			const cartItemId = data[0].id;
			const currentQuantity = data[0].quantity;
			const newQuantity = currentQuantity + productQuantity;

			const { error } = await supabase
				.from("cart_item")
				.update({ quantity: newQuantity })
				.eq("id", cartItemId);

			if (error) {
				console.log(error);
				return null;
			}
		} else {
			// Add new cart item
			const { error } = await supabase.from("cart_item").insert({
				user_id: userId,
				product_id: productId,
				quantity: productQuantity,
			});
			if (error) {
				console.log(error);
				return null;
			}
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

	async function getSavedQuantity(userId, productId) {
		const { data, error } = await supabase
			.from("cart_item")
			.select()
			.eq("user_id", userId)
			.eq("product_id", productId);
		if (error) {
			console.log(error);
			return 1;
		}
		return data.length > 0 ? data[0].quantity : 1;
	}

	if ($page.data.dbUser) {
		getSavedQuantity($page.data.dbUser.data.id, id).then((quantity) => {
			productQuantity = quantity;
		});
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


	async function updateProductQuantity(change) {
		productQuantity += change;
		if (productQuantity < 1) {
			productQuantity = 1;
		}
		const { error } = await supabase
			.from("cart_item")
			.update({ quantity: productQuantity })
			.eq("user_id", $page.data.dbUser.data.id)
			.eq("product_id", id);
		if (error) {
			console.log(error);
			return null;
		}
	}
</script>

<div class="container">
	<img src={image_url} alt="Product Image" class="img-product" />
	<div class="over_pic">
		{#if count && count > 0}<p class="count">{count} шт.</p>{/if}
		<p class="count">{category.title}</p>
	</div>
	<div class="card_inner">
		<div class="title_bar">
			<p class="title">{title}</p>
			<p class="weight">{weight} гр.</p>
		</div>
		<div class="tooltip">
			<p class="description">{description}</p>
			<span class="tooltiptext">{description}</span>
		</div>
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
			<div class="productQuantity">
				{#if isInCart}
					<button on:click={() => updateProductQuantity(-1)} class="quantity">&lt;</button>
					<span>{productQuantity}</span>
					<button on:click={() => updateProductQuantity(1)} class="quantity">&gt;</button>
				{/if}
			</div>
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

		width: 322px;


		background: #FFFFFF;
		box-shadow: 0 12px 21px rgba(0, 0, 0, 0.25);
		border-radius: 18px;


		@media (max-width: 768px) {
			width: 90%;
			display: flex;
			margin-right: auto;
			margin-left: auto;
		}


	}
	.img-product{
		width: 322px;
		height: 240px;
	}
	.description {
		white-space: nowrap; /* Запрещаем перенос строк */
		overflow: hidden; /* Обрезаем все, что не помещается в область */
		padding: 5px; /* Поля вокруг текста */
		text-overflow: ellipsis; /* Добавляем многоточие */
	}

	.card_inner {
		padding: 20px 24px;

		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.tooltip {
		position: relative;
		display: inline-block;
	}

	.tooltip .tooltiptext {
		visibility: hidden;
		width: 220px;
		background-color: #555;
		color: #fff;
		text-align: center;
		border-radius: 6px;
		padding: 5px;
		position: absolute;
		z-index: 1;
		bottom: 105%; /* позиция подсказки над элементом */
		left: 50%;
		margin-left: -120px;
		opacity: 0;
		transition: opacity 0.3s;
	}

	.tooltip:hover .tooltiptext {
		visibility: visible;
		opacity: 1;
	}
	.productQuantity{
		display: flex;
		font-style: normal;
		font-weight: 900;
		font-size: 22px;
		padding-top: 10px;
		padding-left: 20px;

		span{
			display: flex;
			align-items: center;
		}
	}
	.quantity{
		background: white;
		font-size: 28px;
	}
	.quantity:hover{
		background: white;
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
		font-size: 20px;
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
		font-size: 20px;

		@media (max-width: 768px) {
			padding: 12px 60px;
			font-size: 18px;
		}
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
	.img-product {
		width: 100%;
		height: auto;
	}

	.title_bar {
		display: flex;
		align-items: center;
		gap: 16px;

		@media (max-width: 768px) {
			flex-direction: column;
		}
	}

	.productQuantity {
		display: flex;
		font-style: normal;
		font-weight: 900;
		font-size: 22px;
		padding-top: 10px;
		padding-left: 20px;

		span {
			display: flex;
			align-items: center;
		}

		@media (max-width: 768px) {
			padding-left: 0;
			justify-content: center;
		}
	}

	.quantity {
		background: white;
		font-size: 28px;
	}

	.quantity:hover {
		background: white;
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

		@media (max-width: 768px) {
			padding: 12px 40px;
			font-size: 18px;
		}
	}
</style>
