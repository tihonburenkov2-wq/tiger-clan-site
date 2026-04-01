import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Application {
  id?: string
  created_at?: string
  pubg_nickname: string
  player_id: string
  platform: string
  age: number
  location: string
  rank: string
  kd: number
  favorite_mode: string
  role: string
  hours_per_day: number
  team_play: boolean
  previous_clans: string
  tournament_exp: string
  contacts: string
  has_mic: boolean
  online_time: string
  why_join: string
  what_can_give: string
  ready_to_follow_rules: boolean
}

// Helper to insert application
export async function insertApplication(data: Omit<Application, 'id' | 'created_at'>) {
  const { data: result, error } = await supabase
    .from('applications')
    .insert([data])
    .select()
  
  if (error) throw error
  return result
}

// Helper to get all applications (admin)
export async function getApplications() {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

// Helper to delete application (admin)
export async function deleteApplication(id: string) {
  const { error } = await supabase
    .from('applications')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}
