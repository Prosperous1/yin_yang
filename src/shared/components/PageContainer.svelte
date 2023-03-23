<script lang="ts">
	import { fly } from 'svelte/transition';

	export let pathname: string = '';
</script>

{#key pathname}
	<div class="page_container" in:fly={{ x: -10, duration: 200, delay: 200 }} out:fly={{ x: 5, duration: 200 }}>
		<slot />
	</div>
{/key}

<style>
	.page_container {
		margin: 0 auto;
		max-width: 1240px;
	}
</style>