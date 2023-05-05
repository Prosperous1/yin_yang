declare namespace App {
	interface supabase {
		Database: import('./DatabaseDefinitions').Database
		SchemaName: 'public'
	}

	interface PageData {
		session: import('@supabase/auth-helpers-sveltekit').SupabaseSession
	}
}