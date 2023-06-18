<script>
	import ListItem from "./ListItem.svelte";
</script>

<footer>
	<div class="container">
		<div>
			<nav>
				<ul>
					<li>
						<a href="/#menu">Меню</a>
					</li>
				</ul>
				<ul>
					<li>
						<a href="/deals">Акции</a>
					</li>
				</ul>
				<ul>
					<li>
						<a href="/contact">Контакты</a>
					</li>
				</ul>
			</nav>
			<div class="contacts_container">
				<a class="phone" href="tel: 8-800-355-35-55">8-800-355-35-55</a>
				<p class="address_line">ст. Каневская, ул. Пушкина, д. 10</p>
			</div>
			<p class="aware">Мы получаем и обрабатываем персональные данные посетителей
				нашего сайта в соответствии с официальной политикой.
			</p>
		</div>
		<div>
			<div class="qr_container">
				<img src="image/qr.svg" alt="Scan to download mobile app!">
				<p>Мобильное приложение</p>
			</div>
			<div class="social_container">
				<a href="https://tg.com">
					<img src="icons/social/telegram.svg" alt="Telegram">
				</a>
				<a href="https://tg.com/">
					<img src="icons/social/vk.svg" alt="VKontakte">
				</a>
			</div>
		</div>
	</div>
</footer>

<style lang="scss">
	footer {
		background: #282828;
	}

	.container {
		max-width: 1240px;
		margin: 0 auto;
		padding: 40px;

		display: flex;
		justify-content: space-between;

		:last-child {
			div {
				margin-top: 20px;
			}
		}
	}

	nav {
		display: flex;
		gap: 80px;
	}

	ul {
		margin: 0;
		padding: 0;
		:first-child {
			font-weight: 900;
			font-size: 26px;

			margin-bottom: 20px;

			color: white;
			text-decoration: none;
		}
	}

	li {
		list-style: none;
	}

	.contacts_container {
		margin: 60px 0 40px 0;
		a, p {
			color: rgba(255, 255, 255, 0.90);
			font-size: 20px;
		}
	}

	.aware {
		max-width: 450px;
		font-weight: 600;
		font-size: 12px;
		text-decoration: underline;
		color: #ADADAD;
	}

	.qr_container {
		background: #0E0E0E;
		text-align: center;
		text-align: -webkit-center;
		padding: 20px 25px;
		border-radius: 19px;

		p {
			font-weight: 900;
			font-size: 22px;
			color: #A9A9A9;
			max-width: 141px;
			margin: 10px;
		}
	}

	.social_container {
		display: flex;

		border-radius: 19px;
		background: #0E0E0E;
		justify-content: space-between;

		padding: 16px 42px;
	}



	@media (max-width: 480px) {
		.container {
			flex-direction: column;
			padding: 20px;
		}
		nav {
			flex-direction: column;
			gap: 20px;
		}

		.contacts_container {
			margin: 20px 0;
			text-align: center;
		}

		.qr_container {
			margin: 20px 0;
		}

		.social_container {
			justify-content: center;
		}
	}
</style>
