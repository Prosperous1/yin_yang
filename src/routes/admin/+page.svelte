<script>
	import { supabase } from '../lib/supabase.js'
	import { navigate } from 'svelte-routing'
	import { onMount } from 'svelte'

	let name = ''
	let price = 0
	let error = null
	let userRole = null

	async function handleAddItem(event) {
		event.preventDefault()
		const { data, error: insertError } = await supabase.from('items').insert({
			name,
			price,
		})
		if (insertError) {
			error = insertError.message
		} else {
			navigate('/')
		}
	}

	onMount(async () => {
		const { user, error } = await supabase.auth.user()
		if (error) {
			console.log(error.message)
		} else {
			userRole = user.user_metadata.role
			if (userRole !== 'admin') {
				navigate('/')
			}
		}
	})
</script>

<main>
	<h1>Add Item</h1>
	{#if userRole === 'admin'}
		<form on:submit={handleAddItem}>
			<label>
				Name
				<input type="text" bind:value={name} />
			</label>
			<label>
				Price
				<input type="number" step="0.01" bind:value={price} />
			</label>
			<button type="submit">Add Item</button>
		</form>
		{#if error}
			<p>{error}</p>
		{/if}
	{:else}
		<p>You are not authorized to add items.</p>
	{/if}
</main>
