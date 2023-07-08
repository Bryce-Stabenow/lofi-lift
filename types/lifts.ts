export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      lifts: {
        Row: {
          category: string
          created_at: string
          id: number
          name: string
          reps: Json | null
          speed: number | null
          time: number | null
          user_id: string
          weight: number | null
        }
        Insert: {
          category: string
          created_at?: string
          id?: number
          name: string
          reps?: Json | null
          speed?: number | null
          time?: number | null
          user_id: string
          weight?: number | null
        }
        Update: {
          category?: string
          created_at?: string
          id?: number
          name?: string
          reps?: Json | null
          speed?: number | null
          time?: number | null
          user_id?: string
          weight?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export interface Lift {
  category: string
  created_at: string
  id: number
  name: string
  reps: Json | null
  speed: number | null
  time: number | null
  user_id: string
  weight: number | null
}

export enum CategoryEnums {
  Push = 'push',
  Pull = 'pull',
  Legs = 'legs',
  Cardio = 'cardio',
  Abs = 'abs',
}