<script>

	export let data;
	$: ({ user, userProfile, session, supabase, delivery_address,userFavorite } = data);
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
					<button on:click={() => removeFromCart(item)}>Удалить</button>
				</div>
			{/each}
		</div>
		<div class="container">
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

	.cart-container{
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: flex-start;

		max-height: 1500px;

		gap: 49px;
		background: #FFFFFF;
		box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.17);
		border-radius: 48px;

	}

	.cart-card{
		display: flex;

		min-width: 350px;
		max-height: 190px;
		background: #FFFFFF;
		box-shadow:  0px 0px 22px -2px rgba(0, 0, 0, 0.25);
		border-radius: 18px;
		margin: 15px;

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

</style>
