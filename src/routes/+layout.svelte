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
	import {invalidate} from '$app/navigation';
	import {onMount} from 'svelte';

	/**
	 * Components
	 */
	import Header from "../shared/components/Header.svelte";
	import PageContainer from "../shared/components/PageContainer.svelte";
	import Footer from "../shared/components/Footer.svelte";


	export let data: LayoutServerData;

	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});

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
