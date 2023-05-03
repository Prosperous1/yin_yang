<section>
	<div class="section">
		<div class="card-prof-up">
			<div>
				<p>Username</p>
				<div class="card-progress">
					<img src="icons/ui/flower.svg" alt="">
					<p>Частый гость</p>
				</div>
			</div>
			<div class="card-btn">
				<div class="card-progress">
					<button> <img src="icons/ui/archive.svg" alt=""> Заказы</button>
				</div>
				<div class="card-progress">
					<button><img src="icons/ui/heart.svg" alt=""> Любимое</button>
				</div>
			</div>
		</div>
		<div class="card-prof-low">
			<div class="card-personal">
				<h1>Личное</h1>
				<div class="personal-desc">
					<img src="icons/ui/accountgrey.svg" alt="">Username
				</div>
				<div class="personal-desc">
					<img src="icons/ui/message.svg" alt="">Mail
				</div>
				<div class="personal-desc">
					<img src="icons/ui/call.svg" alt="">Phone number
				</div>
				<button>Изменить</button>
			</div>
			<div class="card-personal">
				<h1>Данные <br> доставки</h1>
				<button><img src="icons/ui/location.svg" alt=""> Чичеринская, 16</button>
				<button><img src="icons/ui/credit.svg" alt=""> *** 4532</button>
				<button>Изменить</button>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;

		padding: 90px;
	}
	.section{
		display: flex;
		flex-direction: column;
		gap: 90px;
	}

	.card-prof-up{
		display: flex;
		justify-content: space-between;
		padding: 38px 27px;
		gap: 35px;

		position: relative;
		box-shadow: 0 0 24px 4px rgba(0, 0, 0, 0.25);
		background: white;
		border-radius: 18px;
	}

	.card-progress{
		display: flex;
		align-items: center;
		position: relative;
		gap: 15px;




		background: #282828;
		border-radius: 12px;

		p{
			color: white;
			font-weight: 900;
			font-size: 22px;
			padding-right: 15px;
		}


		button{
			display: flex;
			flex-direction: row;
			align-items: flex-end;
			position: relative;

			color: white;
			background: none;

			font-weight: 900;
			font-size: 22px;

			gap: 36px;
			padding: 14px 24px 15px 36px;
		}


	}

	.card-btn{
		display: flex;
		flex-direction: column;
		gap: 28px;
	}

	.card-personal{
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding: 20px 200px 15px 76px;

		box-shadow: 0 0 24px 4px rgba(0, 0, 0, 0.25);
		background: white;
		border-radius: 18px;

		h1{
			color: black;
			font-weight: 900;
			font-size: 28px;
		}


		button{
			display: flex;
			align-items: flex-end;
			justify-content: space-around;

			padding: 10px 20px 8px 10px;
			gap: 10px;

			background: #efefef;
			color: #636363;

			border-radius: 14px;
			font-weight: 900;
			font-size: 20px;
		}
	}


	.personal-desc{
		display: flex;
		flex-direction: row;
		align-items: baseline;

		gap: 9px;

		font-weight: 800;
		font-size: 20px;
		color: #666666;
	}


	.card-prof-low{
		display: flex;
		flex-direction: row;
		gap: 50px;
	}

</style>