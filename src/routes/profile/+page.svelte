<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import {invalidate} from "$app/navigation";
	import PopUp from "../../shared/components/service/PopUp.svelte";
	import { slide } from 'svelte/transition'
	import { onMount } from 'svelte';
	import { enableHorizontalScroll } from './scroll';

	let isExpanded = false

	function clickHandler() {
		isExpanded = !isExpanded
	}

	let isOpen = false;
	let isPopupOpen = false;
	let isUpdate = false;


	// scroll
	let container: HTMLElement;

	onMount(() => {
		const cleanup = enableHorizontalScroll(container);

		return cleanup;
	});

	export let data;
	$: ({ user, userProfile, session, supabase, delivery_address,userFavorite } = data);

	let profileForm: any;
	let dataForm: any;
	let firstName: string = user?.first_name ?? '';
	let lastName: string = user?.last_name ?? '';
	let email: string = user?.email ?? '';
	let phone: string = user?.phone ?? '';
	let address: string = delivery_address?.address??'';



	let loading = false;
	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			if (result.type === 'redirect') {
				await invalidate('supabase:auth');
			} else {
				await applyAction(result);
			}
			loading = false;

			swapPopup()
		};
	};
	const handleSubmitt: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			if (result.type === 'redirect') {
				await invalidate('supabase:auth');
			} else {
				await applyAction(result);
			}
			loading = false;
			closeEditor()
		};
	};

	const handleSignOut: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			await update();
		}
	}
	const toggleExpanded = () => {
		isExpanded = !isExpanded;
	};


	function swapPopup() {
		isOpen = !isOpen;
	}
	const openEditor = () => {
		isUpdate = true;
	};
	const closeEditor = () => {
		isUpdate = false;
	};

	function closePopup() {
		dispatch('close')
	}


	export let  form;

</script>

<section>
	<div class="section">
		<div class="card-prof-up">
			<div class="container">
				<div>
					<h1>{userProfile.userInfo.first_name}</h1>
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
		<div class="favorite-wrapper">
			<div class="favorite-container" bind:this={container}>
				{#each userProfile.userFavorite as item}
					<div class="favorite-card">
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
			</div>
		</div>
		<div class="card-prof-low">
			<div class="card-personal">
				<h1>Личное</h1>
				<div class="personal-desc">
					<img src="icons/ui/accountgrey.svg" alt="">
					<p>{userProfile.userInfo.first_name} {userProfile.userInfo.last_name}</p>
				</div>
				<div class="personal-desc">
					<img src="icons/ui/message.svg" alt="">{user.email}
				</div>
				<div class="personal-desc">
					<img src="icons/ui/call.svg" alt="">{user.phone}
				</div>
				<div class="btn"><button on:click={swapPopup}>Изменить</button></div>
				<PopUp class="personal" {isOpen} on:close={swapPopup}>
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
								<label for="firstName" class="label"><img src="icons/ui/accountgrey.svg" alt=""></label>
								<p class="control">
									<input
										id="firstName"
										name="firstName"
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
				<button on:click={clickHandler}><img src="icons/ui/location.svg" alt="">Address</button>
				{#if isExpanded}
						<ul transition:slide>
							<button on:click={openEditor}><img src="icons/ui/pencil.svg" alt="">Добавить Адрес</button>
							{#if isUpdate}
								<div id="page-mask">
									<dialog open>
										<button class="editor-close" on:click={closeEditor}>×</button>
										<main>
											{#if form?.error}
												<div class="block notification is-danger">{form.error}</div>
											{/if}
											<form
												class="form-widget-addres"
												method="post"
												action="?/insert"
												use:enhance={handleSubmitt}
												bind:this={dataForm}
											>
												<div class="field">
													<h2>Адрес Доставки</h2>
													<label for="address" class="label"></label>
													<p class="control">
														<input
															id="address"
															name="address"
															value={form?.values?.address ?? ''}
															class="input"
															type="text"
															placeholder="Адрес"
															required
														/>
													</p>
												</div>
												<div class="field">
													<input
														type="submit"
														class="button block primary"
														value={loading ? 'Сохраняем...' : 'Сохранить'}
														disabled={loading}
													/>
												</div>
											</form>
											{#if isPopupOpen}
												<PopUp onClose={closeEditor} />
											{/if}
										</main>
									</dialog>
								</div>
							{/if}
						</ul>
				{/if}
				<button><img src="icons/ui/credit.svg" alt=""> *** 4532</button>
				<div class="address">
						{#each userProfile.userAddresses as address }
							<div class="address-contaner">
								<p>{address.address}</p>
								<button>-</button>
							</div>
						{/each }
				</div>
			</div>
		</div>
	</div>

	<form action="/logout" method="post" use:enhance={handleSignOut}>
		<button disabled={loading} type="submit" class="logout-btn">Sign out</button>
	</form>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
	}
	#page-mask {
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
	dialog{
		margin: 0 auto;
		position: absolute;
		top: 380px;
	}
	.editor-close {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		background: transparent;
		border: none;
		font-size: 2rem;
		cursor: pointer;
		padding: 0;
	}
	.logout-btn{
		display: flex;
		font-size: 26px;
		background: none;
		color: #5d5959;
		padding: 20px 10pc 0px 10px;
	}
	.logout-btn:hover{
		color: red;
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
		max-width: 1440px;
	}
	.container{
		display: flex;
		font-size: 22px;
		font-weight: 900;
	}

	.card-prof-up{
		display: flex;
		max-width: 1440px;
		justify-content: space-between;
		padding: 38px 27px;
		gap: 35px;

		position: relative;
		box-shadow: 0 0 24px 4px rgba(0, 0, 0, 0.25);
		background: white;
		border-radius: 18px;
	}
	.address{
		display: flex;
		flex-direction: column;
		font-size: 22px;
		font-weight: 800;
		color: #5d5959;

		button{
			display: flex;
			font-size: 20px;
		}

	}
	.address-contaner{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;


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
	.form-widget-addres{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10px 10px 15px 10px;

		h2{
			color: black;
			font-weight: 900;
			font-size: 18px;
		}

	}

	.card-personal{
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding:16px 90px 71px 62px;
		min-width: 300px;
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
	.btn{
		display: flex;
		align-items: flex-end;
		justify-content: space-around;

		padding: 10px 2px 8px 10px;
		margin-top: 70px;

		background: #efefef;
		color: #636363;

		border-radius: 14px;
		font-weight: 900;
		font-size: 20px;
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

	.favorite-container{
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		overflow-x: auto;
		overflow: hidden;
		gap: 49px;
		border-radius: 12px;

	}

	.favorite-card{
		display: flex;

		min-width: 450px;
		height: 190px;
		background: #FFFFFF;
		box-shadow:  0px 0px 24px -3px rgba(0, 0, 0, 0.25);
		border-radius: 48px;

		p{
			font-weight: 900;
			font-size: 30px;
		}

		img{
			width: 185px;
			height: 190px;
			border-radius: 16px;
		}
	}
	.favorite-desc{
		display: flex;
		flex-direction: column;
		margin: 0 auto;


	}
	.card-up-desc{
		display: flex;
		flex-direction: column;
		max-height: 200px;
		padding-left: 20px;
		p{
			font-weight: 800;
			font-size: 18px;
			color: #6B6B6B;
			margin: 0;

		}

		h3{
			font-weight: 900;
			font-size: 24px;
		}
		h4{
			font-weight: 900;
			font-size: 24px;
		}
	}
</style>
