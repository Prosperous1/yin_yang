import { createClient } from '@supabase/supabase-js'
import { env } from '$env/dynamic/public'

const supabaseUrl = 'https://liskfjzxdlaenoukvmer.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxpc2tmanp4ZGxhZW5vdWt2bWVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA5NDE2NzgsImV4cCI6MTk5NjUxNzY3OH0.0QqDcjanSHr4T3Rtk2APYryyGkgDlkkQRs5xCn18bcI'

export const supabase = createClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY)
