<script>
	export let data;
	const { user, userProfile, session, supabase, delivery_address, userFavorite,userOrder } = data;

	async function removeFromCart(item) {
		const index = userProfile.userCart.findIndex(cartItem => cartItem.id === item.id);
		userProfile.userCart.splice(index, 1);
		const { data, error } = await supabase.from('cart_item').delete().match({ id: item.id });
		if (error) {
			console.log('Error deleting item:', error);
		} else {
			console.log('Deleted item:', data);
			userProfile.userCart = userProfile.userCart.filter(cartItem => cartItem.id !== item.id);
		}
	}

	async function increaseQuantity(item) {
		item.quantity++;
		await updateCartItem(item);
		updateTotalPrice();
	}

	async function decreaseQuantity(item) {
		if (item.quantity > 1) {
			item.quantity--;
			await updateCartItem(item);
			updateTotalPrice();
		}
	}

	async function updateCartItem(item) {
		const { data, error } = await supabase
			.from('cart_item')
			.update({ quantity: item.quantity })
			.match({ id: item.id });
		if (error) {
			console.log('Error updating item:', error);
		} else {
			console.log('Updated item:', data);
		}
	}
	const deliveryNote = ""
	async function createOrder(userId,statusId) {
		const { data, error } = await supabase
			.from("order")
			.insert([{ user_id: userId, delivery_note: deliveryNote, total_price: getTotalPrice(), status_id: statusId  }]);
		if (error) {
			console.log('Error creating order:', error);
		} else {
			console.log('Created order:', data);
		}
	}

	function getTotalPrice() {
		let totalPrice = 0;
		userProfile.userCart.forEach(item => {
			totalPrice += item.product_id.price * item.quantity;
		});
		return totalPrice;
	}

	function updateTotalPrice() {
		const totalPriceElement = document.querySelector('.total-price');
		const totalPrice = getTotalPrice();
		totalPriceElement.textContent = `Общая цена: ${totalPrice}руб.`;
	}
</script>

<section>
	<h1>Корзина</h1>
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
					<div class="btn">
						<div class="quantity">
							<button on:click={() => decreaseQuantity(item)} class="quantity">&lt;</button>
							<span>{item.quantity}</span>
							<button on:click={() => increaseQuantity(item)} class="quantity">&gt;</button>
						</div>
						<button on:click={() => removeFromCart(item)}  class="remove-btn">Удалить</button>
					</div>
				</div>
			{/each}
			<p class="total-price">Общая цена: {getTotalPrice()}руб.</p>
			<a href="/order">
				<button class="order-btn" on:click={() => createOrder(userProfile.userInfo.id, 1)}>Оформить заказ</button>
			</a>
		</div>
		<div class="container-profile">
			<div class="profile-card">
				<h1>{userProfile.userInfo.first_name}</h1>
				<div class="card-progress">
					<img src="icons/ui/flower.svg" alt="">
					<p>Частый гость</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	section{
		display: flex;
		flex-direction: column;
	}

	.profile-card{
		width: 361px;
		height: 472px;
		left: 879px;
		top: 242px;

		background: #FFFFFF;
		box-shadow: 0px 0px 28px rgba(0, 0, 0, 0.15);
		border-radius: 19px;
	}

	.cart-section{
		display: flex;
		gap: 65px;
	}
	.btn{
		padding-top: 30px;
		display: flex;
		flex-direction: column;
		gap: 30px;
	}

	.order-btn{
		background-color: #E44857;
		color: #ffffff;
		border: none;
		border-radius: 5px;
		padding: 10px 20px;
		font-size: 16px;
		cursor: pointer;
		transition: background-color 0.3s ease-in-out;
		margin-top: 20px;

		&:hover {
			background-color: #d04451;
		}
	}

	.cart-container{
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

	.container{
		display: flex;
		justify-content: center;
		width: 20%; /* added */
	}

	.cart-card{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		min-width: 350px;
		max-height: 190px;
		background: #FFFFFF;
		box-shadow:  0px 0px 22px -2px rgba(0, 0, 0, 0.25);
		border-radius: 18px;
		margin: 15px;
		padding: 20px;

		p{
			font-weight: 900;
			font-size: 30px;
		}

		img{
			width: 175px;
			height: 180px;
			border-radius: 16px;
		}
	}

	.quantity{
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: #000000;
		color: #ffffff;
		border: none;
		border-radius: 5px;
		padding: 5px 10px;
		font-size: 14px;
		cursor: pointer;
		gap: 10px;
	}
	.remove-btn {
		background-color: #E44857;
		color: #ffffff;
		border: none;
		border-radius: 5px;
		padding: 5px 10px;
		font-size: 14px;
		cursor: pointer;
		margin-left: 10px;
		&:hover {
			background-color: #d04451;
		}
	}
	 .card-up-desc{
		 display: flex;
		 flex-direction: column;
		 padding-left: 10px;
	 }



	@media (max-width: 768px) {
		.cart-section{
			display: flex;
			flex-direction: column-reverse;
			gap: 20px;
		}

		.btn{
			display: flex;
			flex-direction: column;
			align-content: center;
			padding-top: 38px;
			gap: 20px;
		}

		.profile-card{
			width: 100%;
			height: 20%;
			display: flex;
			flex-direction: column;
			padding: 40px;
		}
		.remove-btn{
			margin-right: 20px;
		}

		.cart-container{
			min-width: auto;
			margin-right: 20px;
			box-shadow: none;
		}

		.container-profile{
			width: 40%;
		}

		.cart-card{
			flex-direction: row;
			align-items: flex-start;

			box-shadow: none;
			height: 20%;
			margin: 0;
			padding: 0;
			p,h1,h2{
				font-size: 16px;
			}

			img{
				width: 120px;
				height: 120px;
				padding-top: 20px;
				margin-right: 10px;
			}
		}



		.quantity {
			gap: 5px;
			margin-right: 5px;
		}

		.total-price{
			font-size: 22px;
			margin-top: 0;
		}

		button {
			margin-top: 0;
		}
	}
</style>