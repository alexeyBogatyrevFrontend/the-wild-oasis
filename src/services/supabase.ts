import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://kjocgdiamycqxkxzeiek.supabase.co'
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtqb2NnZGlhbXljcXhreHplaWVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUzOTc5MTIsImV4cCI6MjAyMDk3MzkxMn0.CLq_zrRxSZIl13EDkb_sxQN0g-iXLtiaB2xAoUdXddE '

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
