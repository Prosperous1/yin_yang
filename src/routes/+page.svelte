<script lang="ts">
	import type { PageData } from './$types';
	import NavButton from "../shared/components/NavButton.svelte";
	import SectionHeading from "../shared/components/SectionHeading.svelte";
	import ConstructorCard from "../shared/components/home/ConstructorCard.svelte";
	import Filter from "../shared/components/Filter.svelte";
	import FoodCard from "../shared/components/home/FoodCard.svelte";

	const filterItems = ["Сеты", "Пицца", "Суши", "Закуски"];

	export let data: PageData;

	let { products } = data;
	$: ({ products } = data);
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
			<ConstructorCard
				title="Пицца на свой вкус"
				image="icons/ui/bg_pizza.svg"
				notReversed="1"
				column="column"
				description="/// ДИАМЕТР 33 см. // ОСНОВА ИЗ МЕНЮ / ДОБАВКИ ПО ВКУСУ"/>
			<p>&</p>
			<ConstructorCard
				title="Вок на свой вкус"
				image="icons/ui/bg_wok.svg"
				notReversed="-1"
				column="column-reverse"
				description="ОБЪЁМ 300 мл. \\\ Цена: 160 ₽ \\ ДОБАВКИ ПО ВКУСУ \"/>
		</div>
	</div>
	<div id="menu">
		<div class="menu_heading">
			<SectionHeading title="Меню" icon="icons/ui/menu.svg" --font-size="36px"/>
			<Filter filterItems={filterItems}/>
		</div>
		<div class="food_items_container">
			{#each products as {count, title, weight, image_url, description, price, category}}
				<FoodCard
					{count}
					{title}
					{weight}
					{image_url}
					{description}
					{price}
					{category}
				/>
			{/each}
		</div>
	</div>
</section>

<style lang="scss">
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

	.menu_heading {
		display: flex;
		justify-content: space-between;
		margin-bottom: 55px;
	}

	.food_items_container {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	#menu,  {
		scroll-margin-top: 40px;
	}
</style>

