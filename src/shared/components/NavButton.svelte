<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import {createEventDispatcher} from "svelte";

	import type { ActionData } from './$types';

	import { navigate } from 'svelte-routing'
	import { slide, fly } from 'svelte/transition';

	import PopUp from "./service/PopUp.svelte";

	const dispatch = createEventDispatcher()

	const handeleClose = () => {
		isOpen = !isOpen;
	};


	let error = null
	let loading = false;
	let visible = false;
	let isOpen = false;
	let isPopupOpen = false;

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


	function swapPopup() {
		isOpen = !isOpen;
	}
	function closePopup() {
		dispatch('close')
	}

	function openProfile() {
		navigate('src/routes/registration/+page.svelte');
	}

	export let link, title, icon, color, isButton, form: ActionData;
</script>

{#if !isButton}
	<a
		href="{link}"
		class="btn_container"
		on:mouseenter={() => {visible = true}}
		on:mouseleave={() => visible = false}>
		<img src={icon} alt={link}>
		{#if visible}
			<div class="title-wrapper"
				 in:slide="{{axis: 'x', duration: 200}}"
				 out:slide="{{axis: 'x', duration: 200, delay: 150}}"
			>
				<div class="title"
					 in:fly="{{ x: -50, duration: 200, delay: 150 }}"
					 out:fly="{{ x: -50, duration: 200}}">
					<p style="color: {color}">{title}</p>
				</div>
			</div>
		{/if}
	</a>
	{:else}
		<button on:click={swapPopup}  class="btn-acc"><img src="/icons/ui/Logout.svg"></button>
		<PopUp {isOpen} on:close={swapPopup}>
			<main>
				<h1>Войти</h1>
				{#if form?.error}
					<div class="block notification is-danger">{form.error}</div>
				{/if}
				<form method="post" use:enhance={handleSubmit}>
					<div class="field">
						<label for="email" class="label">Почта</label>
						<p class="control">
							<input
								id="email"
								name="email"
								value={form?.values?.email ?? ''}
								class="input"
								type="email"
								placeholder="Email"
								required
							/>
						</p>
					</div>
					<div class="low-account">
						<div class="field">
							<label for="password" class="label">Пароль</label>
							<p class="control">
								<input
									id="password"
									name="password"
									class="input"
									type="password"
									placeholder="Password"
									required
								/>
							</p>
						</div>
						<div class="field">
							<p class="control">
								<button disabled={loading} class="button is-fullwidth is-link">Войти</button>
							</p>
						</div>
						<a href="registration" style="color: #5d5959" on:click = {handeleClose} >Регистрация</a>
						</div>
				</form>
				{#if isPopupOpen}
					<PopUp onClose={closePopup} />
				{/if}
				{#if error}
					<p>{error}</p>
				{/if}
			</main>
		</PopUp>
{/if}



<style lang="scss">

	button{
		background: none;
		color: black;
		font-weight: bold;
		font-size: 16px;
	}

	label{
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 15px;
	}

	main{
		display: flex;
		flex-direction: column;
		gap: 10px;
		align-items: center;
		padding: 20px 20px 10px 20px;

		a{
			font-size: 15px;
		}
	}
	.low-account{
		display: flex;
		align-items: center;
		flex-direction: column;

	}


	.popup-close{
		display: flex;
		justify-content: center;
	}

	.form{
		display: flex;
		flex-direction: column;
		gap: 20px;
		font-size: 20px;
	}


	.btn-acc{
		background: none;
	}

	.btn_container {
		display: flex;
		align-items: center;
		gap: 10px;

		transition: .3s;

		border-radius: 12px;

		text-decoration: none;

		font-size: 20px;

		padding: .5em;

		//background: rgba(211, 211, 211, 0.40);

		height: 46px;

		p {
			text-align: center;
			padding-right: 10px;
		}
	}
</style>
