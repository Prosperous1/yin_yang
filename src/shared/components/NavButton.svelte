<script lang="ts">
	import {supabase} from '/src/routes/lib/supabase.js'
	import { navigate } from 'svelte-routing'

	import { slide, fly } from 'svelte/transition';

	import PopUp from "./service/PopUp.svelte";
	import {createEventDispatcher} from "svelte";

	let email = ''
	let password = ''
	let error = null

	async function handleLogin(event) {
		event.preventDefault()
		const { user, error: authError } = await supabase.auth.signIn({
			email,
			password,
		})
		if (authError) {
			error = authError.message
		} else {
			navigate('/')
		}
	}

	let visible = false;

	const dispatch = createEventDispatcher()
	let isOpen = false;

	function swapPopup() {
		isOpen = !isOpen;
	}
	function closePopup() {
		dispatch('close')
	}

	let isPopupOpen = false;
	function openProfile() {
		navigate('src/routes/registration/+page.svelte');
	}

	export let link, title, icon, color, isButton;
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
		<button on:click={swapPopup}  class="btn-acc"><img src="/icons/ui/account.svg"></button>
		<PopUp {isOpen} on:close={swapPopup}>
			<main>
				<h1>Войти</h1>
				<form on:submit={handleLogin} class="form">
					<label>
						Почта
						<input type="email" bind:value={email} />
					</label>
					<label>
						Пароль
						<input type="password" bind:value={password} />
					</label>
					<button type="submit">Логин</button>
					<a on:click={swapPopup} href="registration" style="color: gray">Регистрация</a>
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

		background: rgba(211, 211, 211, 0.40);

		height: 46px;

		p {
			text-align: center;
			padding-right: 10px;
		}
	}
</style>
