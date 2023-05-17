<script>
	import { applyAction, enhance } from '$app/forms';

	export let form;
	let loading = false;

	const handleSubmit = () => {
		loading = true;
		return async ({ result }) => {
			await applyAction(result);
			loading = false;
		};
	};
</script>

<main>
	<h1>Зарегистрироваться</h1>
	{#if form?.error}
		<div class="block notification is-danger">{form.error}</div>
	{/if}
	{#if form?.message}
		<div class="block notification is-primary">{form.message}</div>
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
	</form>
</main>

<style lang="scss">


</style>
