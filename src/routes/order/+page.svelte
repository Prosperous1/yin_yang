<script>
	export let data;
	const { user, userProfile, session, supabase, userFavorite } = data;

	let delivery_address;
	let delivery_note;
	let orderSubmitted = false;

	function getTotalPrice() {
		let totalPrice = 0;
		userProfile.userCart.forEach(item => {
			totalPrice += item.product_id.price * item.quantity;
		});
		return totalPrice;
	}

	async function updateOrder(userId, statusId) {
		// Fetch the latest existing order using the user_id
		const { data: existingOrders, error: fetchError } = await supabase
			.from('order')
			.select('*')
			.eq('user_id', userId)
			.order('created_at', { ascending: false })
			.limit(1);
		if (fetchError) {
			console.log('Error fetching order:', fetchError);
			return;
		}
		const existingOrder = existingOrders[0];
		if (existingOrder) {
			// Update the existing order with new data
			const { data: updatedOrder, error: updateError } = await supabase
				.from('order')
				.update({
					delivery_address: delivery_address,
					delivery_note: delivery_note,
					total_price: getTotalPrice(),
					status_id: statusId,
				})
				.eq('id', existingOrder.id)
				.single();
			if (updateError) {
				console.log('Error updating order:', updateError);
			} else {
				console.log('Updated order:', updatedOrder);
				orderSubmitted = true;
			}
		} else {
			// If no existing order, create a new one
			const { data: newOrder, error: insertError } = await supabase
				.from('order')
				.insert([
					{
						user_id: userId,
						delivery_address: delivery_address,
						delivery_note: delivery_note,
						total_price: getTotalPrice(),
						status_id: statusId,
					},
				])
				.single();
			if (insertError) {
				console.log('Error creating new order:', insertError);
			} else {
				console.log('Created new order:', newOrder);
				orderSubmitted = true;
			}
		}

	}
</script>

{#if !orderSubmitted}
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
			<button on:click={() => updateOrder(userProfile.userInfo.id, 1)}>Сформировать заказ</button>
		</div>
	</div>
</section>
{:else} <!-- Add this line -->
	<div class="finish-container">
		<p class="finish-txt">Ваш заказ успешно создан!</p>
		<a href="/#menu"><button class="menu-btn">Вернуться в меню</button></a>
	</div>

{/if} <!-- Add this line -->

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

	.finish-container{
		display: flex;
		flex-direction: column;
		height: 400px;
	}
	.finish-txt {
		padding-top: 120px;
		font-size: 24px;
		font-weight: bold;
		color: #333;
		text-align: center;
		margin-bottom: 20px;
	}

	.menu-btn {
		display: block;
		margin: 0 auto;
		padding: 10px 20px;
		background-color: #E44857;
		color: #fff;
		border: none;
		border-radius: 5px;
		font-size: 18px;
		font-weight: bold;
		cursor: pointer;
		transition: background-color 0.3s ease-in-out;

		&:hover {
			background-color: #d04451;
		}
	}
</style>