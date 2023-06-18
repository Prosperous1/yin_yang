<script>
	export let data;
	const { user, userProfile, session, supabase, userFavorite } = data;

	let delivery_address;
	let delivery_note;

	function getTotalPrice() {
		let totalPrice = 0;
		userProfile.userCart.forEach(item => {
			totalPrice += item.product_id.price * item.quantity;
		});
		return totalPrice;
	}

	async function updateOrder(userId) {
		const { data: order, error } = await supabase
			.from('order')
			.insert([{ user_id: userId, delivery_address: delivery_address, delivery_note: delivery_note, total_price: getTotalPrice() }])
			.single();

		if (error) {
			console.log(error);
			return;
		}

		console.log(order);

		// Clear the cart items after the order is created
		const { data: deletedData, error: deleteError } = await supabase.from('cart_item').delete().match({ user_id: userId });
		if (deleteError) {
			console.log('Error deleting cart items:', deleteError);
		} else {
			console.log('Deleted cart items:', deletedData);
			userProfile.userCart = []; // Clear the userCart in the userProfile
		}
	}
</script>


<section>
	<h1>Оформление заказа</h1>
	<div class="cart-section">
		<div class="cart-container">
			{#each userProfile.userCart as item (item.id)}
				<div class="cart-card">
					<div>
						<img src="{item.product_id.image_url}" alt="Pictures">
					</div>
					<div class="card-up-desc">
						<h3>{item.product_id.title}</h3>
						<p>{item.product_id.weight}гр.</p>
						<h4>{item.product_id.price}руб.</h4>
					</div>
				</div>
			{/each}
			<label for="delivery-address">Адрес доставки</label>
			<select id="delivery-address" bind:value={delivery_address}>
				{#each userProfile.userAddresses as address}
					<option>{address.address}</option>
				{/each}
			</select>
			<label for="delivery-note">Комментарий к доставке</label>
			<input type="text" id="delivery-note" bind:value={delivery_note}>
			<p class="total-price">{getTotalPrice()}руб.</p>
			<button on:click={() => updateOrder(userProfile.userInfo.id)}>Сформировать заказ</button>
		</div>
	</div>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		.profile-card {
			width: 361px;
			height: 472px;
			left: 879px;
			top: 242px;
			background: #FFFFFF;
			box-shadow: 0px 0px 28px rgba(0, 0, 0, 0.15);
			border-radius: 19px;
		}
		.cart-section {
			display: flex;
			flex-direction: row;
			gap: 65px;
			.cart-container {
				display: flex;
				flex-direction: column;
				flex-wrap: nowrap;
				justify-content: flex-start;
				gap: 49px;
				background: #FFFFFF;
				box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.17);
				border-radius: 48px;
				padding: 20px;
				width: 80%; /* added */
			}
			.container {
				display: flex;
				justify-content: center;
				width: 20%; /* added */
			}
			.cart-card {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				min-width: 350px;
				max-height: 190px;
				background: #FFFFFF;
				box-shadow: 0px 0px 22px -2px rgba(0, 0, 0, 0.25);
				border-radius: 18px;
				margin: 15px;
				padding: 20px;
				p {
					font-weight: 900;
					font-size: 30px;
				}
				img {
					width: 175px;
					height: 180px;
					border-radius: 16px;
				}
			}
			.quantity {
				display: flex;
				flex-direction: row;
				align-items: center;
				gap: 10px;
			}
		}
		.total-price {
			font-weight: bold;
			font-size: 24px;
			margin-top: 20px;
		}
		button {
			background-color: #E44857;
			color: white;
			border: none;
			padding: 10px 20px;
			border-radius: 5px;
			font-size: 20px;
			margin-top: 20px;
			cursor: pointer;
			&:hover {
				background-color: #d04451;
			}
		}
		label {
			font-size: 24px;
			font-weight: bold;
		}
		select {
			font-size: 20px;
			padding: 10px;
			border-radius: 5px;
			border: 2px solid #ccc;
			margin-bottom: 20px;
		}
	}
</style>