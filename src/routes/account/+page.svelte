<script>
	import { supabase } from '../lib/supabase.js'
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
</script>

<main>
	<h1>Профиль</h1>
	<form on:submit={handleLogin}>
		<label>
			Почта
			<input type="email" bind:value={email} />
		</label>
		<label>
			Пароль
			<input type="password" bind:value={password} />
		</label>
		<button type="submit">Логин</button>
		<a href="registration" style="color: black">Регистрация</a>
	</form>
	{#if error}
		<p>{error}</p>
	{/if}
</main>
