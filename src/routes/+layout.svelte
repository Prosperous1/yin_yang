<script lang="ts">
	/**
	 * Styling
	 */
    import '../app.css'
    import '../styles/fonts.css'

	/**
	 * Service
	 */
	import type { LayoutServerData } from './$types';

	/**
	 * Components
	 */
	import NavBar from "../shared/components/Header.svelte";
	import PageContainer from "../shared/components/PageContainer.svelte";

	export let data: LayoutServerData;
</script>

<main class="layout">
	<NavBar/>

	<PageContainer pathname={data.pathname}>
		<slot />
	</PageContainer>

</main>

<style>
	.layout {
		max-width: 74rem;
		margin: 0 auto;
		padding: 2rem;
	}
</style>
