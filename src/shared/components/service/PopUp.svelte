<script>

	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let isOpen = false
	export let isUpdate = false

	function closePopup() {
		dispatch('close')
	}
	function closeEditor() {
		dispatch('close')
	}
</script>

{#if isUpdate}
	<div class="popup-backdrop">
		<div class="popup">
			<slot name="header">
				<button class="popup-close" on:click={closeEditor}>×</button>
			</slot>
			<slot></slot>
		</div>
	</div>
{/if}




{#if isOpen}
	<div class="popup-backdrop">
		<div class="popup">
			<slot name="header">
				<button class="popup-close" on:click={closePopup}>×</button>
			</slot>
			<slot></slot>
		</div>
	</div>
{/if}

<style>
	.popup-backdrop {
		background-color: rgba(0, 0, 0, 0.5);
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: 100;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.popup {
		display: flex;
		flex-direction: column;
		background-color: white;
		padding: 2rem;
		border-radius: 0.5rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		position: relative;
	}

	.popup-close {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		background-color: transparent;
		border: none;
		font-size: 2rem;
		cursor: pointer;
		padding: 0;
	}
</style>
