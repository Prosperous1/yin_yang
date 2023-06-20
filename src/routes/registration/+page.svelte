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
				<button disabled={loading} class="button is-fullwidth is-link">Зарегистрироваться</button>
			</p>
		</div>
	</form>
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 2rem;
	}
	h1 {
		font-size: 2rem;
		margin-bottom: 2rem;
	}
	form {
		width: 100%;
		max-width: 400px;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2rem;
		background-color: #f2f2f2;
		border-radius: 10px;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
	}
	.field {
		width: 100%;
		margin-bottom: 1rem;
	}
	.label {
		font-size: 1.2rem;
		margin-bottom: 0.5rem;
	}
	.control {
		width: 100%;
	}
	.input {
		width: 100%;
		padding: 0.5rem;
		border-radius: 5px;
		border: none;
		background-color: #ffffff;
		box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
	}
	.button {
		width: 100%;
		padding: 0.5rem;
		border-radius: 5px;
		border: none;
		background-color: #E44857;
		color: #ffffff;
		font-size: 1.2rem;
		cursor: pointer;
		transition: background-color 0.2s ease-in-out;
	}
	.button:hover {
		background-color: #d33e4c;
	}
	.notification {
		padding: 1rem;
		border-radius: 5px;
		margin-bottom: 1rem;
		font-size: 1.2rem;
	}
	.is-danger {
		background-color: #e74c3c;
		color: #ffffff;
	}
	.is-primary {
		background-color: #3498db;
		color: #ffffff;
	}


	@media only screen and (max-width: 768px) {
		form {
			max-width: 100%;
			padding: 1rem;
		}
		.input, .button {
			font-size: 1rem;
		}
	}
</style>
