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
	import Header from "../shared/components/Header.svelte";
	import PageContainer from "../shared/components/PageContainer.svelte";
	import Footer from "../shared/components/Footer.svelte";

	export let data: LayoutServerData;
</script>

<main class="layout">
	<Header/>

	<PageContainer pathname={data.pathname}>
		<slot />
	</PageContainer>

	<Footer/>

</main>

<style>
	.layout {
		margin: 0 auto;
	}
</style>
