<script>
	import { supabase } from '../lib/supabase.js'
	import { navigate } from 'svelte-routing'

	let email = ''
	let password = ''
	let error = null

	async function handleSignup(event) {
		event.preventDefault()
		const { user, error: authError } = await supabase.auth.signUp({
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
	<h1>Зарегистрироваться</h1>
	<form on:submit={handleSignup}>
		<label>
			Почта
			<input type="email" bind:value={email} />
		</label>
		<label>
			Пароль
			<input type="password" bind:value={password} />
		</label>
		<button type="submit">Зарегистрироваться</button>
	</form>
	{#if error}
		<p>{error}</p>
	{/if}
</main>
