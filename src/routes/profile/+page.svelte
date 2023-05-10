<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import {invalidate} from "$app/navigation";
	import PopUp from "../../shared/components/service/PopUp.svelte";


	let isOpen = false;
	let isPopupOpen = false;

	export let data;
	$: ({ user, userInfo,session, supabase, profile } = data);

	let profileForm: any;
	let firstName: string = user?.first_name ?? '';
	let lastName: string = user?.last_name ?? '';
	let phone: string = userInfo?.phone ?? '';
	// let website: string = profile?.website ?? '';
	// let avatarUrl: string = profile?.avatar_url ?? '';



	let loading = false;
	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			loading = false;
		}
	}


	const handleSignOut: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		}
	}



	function swapPopup() {
		isOpen = !isOpen;
	}
	function closePopup() {
		dispatch('close')
	}

	export let  form;

</script>

<section>
	<div class="section">
		<div class="card-prof-up">
			<div class="container">
				<label for="avatar" class="avatar w-32 rounded-full">
					<img src="image/star.jpg" w="32" height="120" alt="user avatar" class="ava">
					<img src="icons/ui/pencil.svg">
				</label>
				<input type="file" name="avatar" id="avatar" value="" accept="image/*" hidden>
				<div>
					{userInfo.first_name}
					<div class="card-progress">
						<img src="icons/ui/flower.svg" alt="">
						<p>Частый гость</p>
					</div>
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
					<img src="icons/ui/accountgrey.svg" alt="">
					<p>{userInfo.first_name} {userInfo.last_name}</p>
				</div>
				<div class="personal-desc">
					<img src="icons/ui/message.svg" alt="">{user.email}
				</div>
				<div class="personal-desc">
					<img src="icons/ui/call.svg" alt="">{user.phone}
				</div>
				<button on:click={swapPopup}>Изменить</button>
				<PopUp {isOpen} on:close={swapPopup}>
					<main>
						<h1>Личное</h1>
						{#if form?.error}
							<div class="block notification is-danger">{form.error}</div>
						{/if}
						<form
							class="form-widget"
							method="post"
							action="?/update"
							use:enhance={handleSubmit}
							bind:this={profileForm}
						>
							<div class="field">
								<label for="fullName" class="label"><img src="icons/ui/accountgrey.svg" alt=""></label>
								<p class="control">
									<input
										id="fullName"
										name="fullName"
										value={form?.values?.first_name ?? ''}
										class="input"
										type="text"
										placeholder="Имя"
										required
									/>
								</p>
							</div>
							<div class="field">
								<label for="lastName" class="label"><img src="icons/ui/accountgrey.svg" alt=""></label>
								<p class="control">
									<input
										id="lastName"
										name="lastName"
										value={form?.values?.last_name ?? ''}
										class="input"
										type="text"
										placeholder="Фамилия"
										required
									/>
								</p>
							</div>
							<div class="field">
								<label for="email" class="label"><img src="icons/ui/message.svg" alt=""></label>
								<p class="control">
									<input
										id="email"
										name="email"
										value={form?.values?.email ?? ''}
										class="input"
										type="email"
										placeholder="email"
										required
									/>
								</p>
							</div>
							<div class="field">
								<label for="phone" class="label"><img src="icons/ui/call.svg" alt=""></label>
								<p class="control">
									<input
										id="phone"
										name="phone"
										value={form?.values?.phone ?? ''}
										class="input"
										type="text"
										placeholder="phone"
										required
									/>
								</p>
							</div>
							<div class="field">
								<input
									type="submit"
									class="button block primary"
									value={loading ? 'Loading...' : 'Сохранить'}
									disabled={loading}
								/>
							</div>
						</form>
						{#if isPopupOpen}
							<PopUp onClose={closePopup} />
						{/if}
					</main>
				</PopUp>
			</div>
			<div class="card-personal">
				<h1>Данные <br> доставки</h1>
				<button><img src="icons/ui/location.svg" alt=""> Чичеринская, 16</button>
				<button><img src="icons/ui/credit.svg" alt=""> *** 4532</button>
			</div>
		</div>
	</div>

	<form action="/logout" method="post" use:enhance={handleSignOut}>
		<button disabled={loading} type="submit">Sign out</button>
	</form>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;

		padding: 90px;
	}
	.ava{
		border-radius: 100px;
	}
	.pencil{
		width: 4px;
		height: 4px;
	}
	.section{
		display: flex;
		flex-direction: column;
		gap: 90px;
	}
	.container{
		display: flex;
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
