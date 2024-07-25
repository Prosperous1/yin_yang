<script lang="ts">
	import type { PageData } from './$types';
	import NavButton from "../shared/components/NavButton.svelte";
	import SectionHeading from "../shared/components/SectionHeading.svelte";
	import ConstructorCard from "../shared/components/home/ConstructorCard.svelte";
	import Filter from "../shared/components/Filter.svelte";
	import FoodCard from "../shared/components/home/FoodCard.svelte";
	import PopUp from "../shared/components/service/PopUp.svelte";

	const filterItems = ["Все", "Сеты", "Пицца", "Суши", "Снеки","Супы","Роллы","Салаты"];

	export let data: PageData;

	let filteredProducts = []
	let isOpen = false;
	let isPopupOpen = false;

	let { products } = data;
	$: ({ products } = data);

	function onFilter(filterCategory) {
		if (filterCategory === "Все") {
			filteredProducts = [];
		}

		filteredProducts = products.filter(
			product => {
				return product.category.title === filterCategory
			}
		)
	}

	function swapPopup() {
		isOpen = !isOpen;
	}
</script>

<section>
	<div class="section">
		<div class="cont">
			<h1 class="callout">
				Доставка <br>
				суши и роллов<br>
				до дома<br>
			</h1>
			<div class="container-menu p-25">
				<p>Перейти в меню</p>
				<a href="#menu">
					<img src="icons/ui/arrow.svg" alt="GoTo Menu">
				</a>
			</div>
			<div class="container-link p-25">
				<p >Мы в социальных сетях</p>
				<div class="social_btns">
					<NavButton link="https://vk.com/" title="ВКонтакте" color="white" icon="icons/social/vk.svg"/>
					<NavButton link="https://tg.com/" title="Телеграм" color="white" icon="icons/social/telegram.svg"/>
				</div>
			</div>
		</div>
		<div class="cont-plus">
			<div class="card-plus">
				<p>Доставка <br>
					& <br>
					Самовывоз</p>
				<img src="icons/service/truck.svg" alt="Delivery or Pick Up">
			</div>
			<div class="card-plus">
				<p>Всего<br>600 ₽</p>
				<img src="icons/service/money.svg" alt="Cost 600">
			</div>
			<div class="card-plus">
				<p>Доставим до дома <br>
					за 60 минут</p>
				<img src="icons/service/stopwatch.svg" alt="Only 60min">
			</div>
		</div>
	</div>

	<img class="bg_pic" src="image/pizza_bag.png" alt="">

	<div>
		<SectionHeading title="Собери сам" icon="icons/ui/constructor.svg" --font-size="42px"/>
		<div class="contstructors">
			<button class="btn-construct" on:click={swapPopup}>
				<ConstructorCard
					title="Пицца на свой вкус"
					image="icons/ui/bg_pizza.svg"
					notReversed="1"
					column="column"
					description="/// ДИАМЕТР 33 см. // ОСНОВА ИЗ МЕНЮ / ДОБАВКИ ПО ВКУСУ"/>
			</button>
			<PopUp class="personal" {isOpen} on:close={swapPopup}>
				<main class="description-constr">
					<h1>Конструктор</h1>
					<img src="image/constructor.jpg" alt="">
					<h2>WOK-лапша</h2>
					<h4>Основа из моркови, болгарского перца, <br>
						грибов, цукини и стручковой фасоли. </h4>
					<h3>Лапша/Рис</h3>
					<form>
						<input type="radio" name="type" value="Лапша" checked> Лапша<br>
						<input type="radio" name="type" value="Рис"> Рис<br>
						<input type="radio" name="type" value="Пшено"> Пшено<br>
					</form>
				</main>
			</PopUp>

			<p class="and_sign">&</p>

			<button class="btn-construct" on:click={swapPopup}>
			<ConstructorCard
				title="Вок на свой вкус"
				image="icons/ui/bg_wok.svg"
				notReversed="-1"
				column="column-reverse"
				description="ОБЪЁМ 300 мл. \\\ Цена: 160 ₽ \\ ДОБАВКИ ПО ВКУСУ \"/>
			</button>
			<PopUp class="personal" {isOpen} on:close={swapPopup}>
				<main class="description-constr">
					<h1>Конструктор</h1>
					<img src="image/constructor.jpg" alt="">
					<h2>WOK-лапша</h2>
					<h4>Основа из моркови, болгарского перца, <br>
						грибов, цукини и стручковой фасоли. </h4>
					<h3>Лапша/Рис</h3>
					<form>
						<input type="radio" name="type" value="Лапша" checked> Лапша<br>
						<input type="radio" name="type" value="Рис"> Рис<br>
						<input type="radio" name="type" value="Пшено"> Пшено<br>
					</form>
				</main>
			</PopUp>
		</div>
	</div>
	<div id="menu">
		<div class="menu_heading">
			<SectionHeading title="Меню" icon="icons/ui/menu.svg" --font-size="36px"/>
			<div class="filter"><Filter  filterItems={filterItems} onFilter={onFilter}/></div>

		</div>
		<div class="food_items_container">
			{#if filteredProducts.length === 0}
				{#each products as {count, title, weight, image_url, description, price, category, id}}
					<FoodCard
						{count}
						{title}
						{weight}
						{image_url}
						{description}
						{price}
						{category}
						{id}
					/>
				{/each}
				{:else }
				{#each filteredProducts as {count, title, weight, image_url, description, price, category, id}}
					<FoodCard
						{count}
						{title}
						{weight}
						{image_url}
						{description}
						{price}
						{category}
						{id}
					/>
				{/each}
			{/if}
		</div>
	</div>
</section>

<style lang="scss">
	.and_sign {
		text-shadow: 0 4px 6px rgba(0, 0, 0, 0.45) !important;
	}
	section {
		display: flex;
		flex-direction: column;

		gap: 90px;
	}
	.section{
		display: flex;
		justify-content: space-between;
	}


	.cont {
		display: flex;
		flex-direction: column;
		gap: 40px;

		p {
			color: white;
			font-size: 30px;
			margin: 0;
			padding: 25px;

			font-weight: 600;
		}
	}

	.callout {
		font-weight: 900;
		font-size: 52px;
	}

	.cont-plus {
		display: flex;
		flex-direction: column;
		gap: 30px;
		align-items: flex-end;

		padding-top: 70px;
	}

	.container-link{
		display: flex;
		flex-direction: column;
		width: 453px;
		height: 176px;
		background: #000000;
		border-radius: 23px;
	}

	.container-menu{
		display: flex;
		align-items: center;
		gap: 35px;
		padding-right: 16px;
		width: 363px;
		height: 69px;
		background: #000000;
		border-radius: 16px;
	}

	.social_btns {
		display: flex;
	}

	.card-plus{
		display: flex;
		gap: 35px;
		align-items: center;

		padding: 15px 24px;

		position: relative;
		box-shadow: 0 0 24px 4px rgba(0, 0, 0, 0.25);
		background: white;
		border-radius: 18px;

		z-index: 1;

		p{
			margin: 0;
			font-weight: 900;
			font-size: 18px;
		}
	}

	.bg_pic {
		position: absolute;

		padding-left: 750px;
		padding-right: 40px;

		z-index: -2;
	}

	.contstructors {
		display: flex;
		justify-content: space-between;

		align-items: center;

		p {
			font-weight: 900;
			font-size: 200px;

			text-shadow: 0 4px 32px rgba(0, 0, 0, 0.45);
		}
	}

	.description-constr{
		p{
			font-size: 18px;
			text-shadow: none;
		}
	}
	.btn-construct{
		background: none;
	}

	.menu_heading {
		display: flex;
		justify-content: space-between;
		margin-bottom: 55px;
	}

	.food_items_container {
		display: flex;
		flex-wrap: wrap;
		width: 1400px;
	}

	#menu,  {
		scroll-margin-top: 40px;
	}

	@media (max-width: 768px) {
		.filter {
			flex-direction: column;
			gap: 30px;
			margin-bottom: 30px;
			overflow-x: auto;
		}

		.food_items_container {
			width: 100%;
		}
	}

	@media (max-width: 768px) {
		section {
			gap: 30px;
		}

		.personal{
			h1,h2,h3{
				font-size: 20px;
			}
			p{
				font-size: 16px;
			}
		}

		.section {
			flex-direction: column;
			gap: 30px;
		}

		.cont {
			gap: 20px;

			p {
				font-size: 24px;
			}
		}

		.callout {
			font-size: 36px;
		}

		.cont-plus {
			gap: 20px;
			justify-content: space-between;
			padding-top: 0;
		}

		.container-link {
			width: 300px;
		}

		.container-menu {
			width: 250px;
		}

		.card-plus {
			gap: 20px;
			padding: 10px 16px;

			p {
				font-size: 14px;
			}
		}

		.bg_pic {
			display: none;
		}

		.contstructors {
			flex-direction: column;
			gap: 30px;

			p {
				font-size: 60px;
			}
		}

		.menu_heading {
			flex-direction: column;
			gap: 30px;
			margin-bottom: 30px;
		}

		.food_items_container {
			width: 100%;
		}
	}
</style>

