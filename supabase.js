import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zzabqlveulrvicgxhytz.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
console.log(supabaseKey, typeof supabaseKey)
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;