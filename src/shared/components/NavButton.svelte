<script lang="ts">
	import {supabase} from '/src/routes/lib/supabase.js'
	import { navigate } from 'svelte-routing'

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

	import { fly } from 'svelte/transition';

	import PopUp from "./service/PopUp.svelte";
	import {createEventDispatcher} from "svelte";


	let visible = false;

	function toggleVisibility() {
		visible = !visible;
	}
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
	<a href="{link}" class="btn_container" on:mouseenter={toggleVisibility} on:mouseleave={toggleVisibility}>
		<img src={icon} alt={link}>
		{#if visible}
			<p style="color: {color}" transition:fly={{ x: -50, duration: 500 }}>{title}</p>
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
					<a href="registration" style="color: gray">Регистрация</a>
				</form>
				{#if isPopupOpen}
					<PopUp onClose={closePopup} />
				{/if}
				{#if error}
					<p>{Ошибка}</p>
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
		width: 46px;
		height: 46px;

		&:hover {
			width: 160px;
			background: rgba(211, 211, 211, 0.40);
		}

		p {
			text-align: center;
			padding-right: 10px;
		}
	}
</style>
