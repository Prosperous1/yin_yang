<script>
	import NavButton from "../../shared/components/NavButton.svelte";
</script>
<section>
	<h1>Контакты</h1>
	<div class="container">
		<div class="container-link">
			<p>YinYang - настоящая азиатская кухня <br>
				приготовленная истинными <br>
				сынами Кореи.</p>

			<p>Социальные сети</p>
			<div class="social_btns">
				<NavButton link="https://vk.com/" title="ВКонтакте" color="white" icon="icons/social/vk.svg"/>
				<NavButton link="https://tg.com/" title="Телеграм" color="white" icon="icons/social/telegram.svg"/>
			</div>
		</div>

		<div class="container-link">
			<p>Обратная связь</p>
			<div class="contact_btns">
				<div class="social_btn">
					<img src="icons/social/mail.svg" alt="">
					<a href="mailto:youremail@example.com">youremail@example.com</a>
				</div>
				<div class="social_btn">
					<img src="icons/social/mobile.svg" alt="">
					<a href="tel:+1234567890">+1234567890</a>
				</div>
			</div>
		</div>
	</div>
</section>
<style lang="scss">

	section{
		display: flex;
		flex-direction: column;
		gap: 20px;
		h1{
			font-size: 28px;
		}
	}
	.container{
		display: flex;
		justify-content: space-between;

		@media (max-width: 768px) {
			display: flex;
			flex-direction: column;
			gap: 30px;

		}
	}

	.social_btns {
		display: flex;
	}
	.social_btn {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		gap: 20px;

		a{
			font-size: 20px;
		}
	}
	.contact_btns{
		display: flex;
		flex-direction: column;
		gap: 30px;
	}
	.container-link{
		display: flex;
		flex-direction: column;
		width: 453px;
		background: #000000;
		border-radius: 23px;
		padding: 20px;

		p{
			color: white;
			font-size: 20px;
		}
	}
	@media (max-width: 768px) {

		.container-link {
			width: 295px;
		}
		.social_btns{
			flex-direction: row;
		}
		.contact_btns {
			flex-direction: column;
			gap: 30px;
		}
	}
</style>