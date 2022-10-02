export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          updated_at: string | null;
          username: string | null;
          avatar_url: string | null;
          website: string | null;
          full_name: string;
        };
        Insert: {
          id: string;
          updated_at?: string | null;
          username?: string | null;
          avatar_url?: string | null;
          website?: string | null;
          full_name: string;
        };
        Update: {
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          avatar_url?: string | null;
          website?: string | null;
          full_name?: string;
        };
      };
      retro_session: {
        Row: {
          id: string;
          name: string;
          is_completed: boolean;
          created_by: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          is_completed?: boolean;
          created_by: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          is_completed?: boolean;
          created_by?: string;
          created_at?: string | null;
        };
      };
      retro_session_messages: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          message: string;
          like_count: number | null;
          created_at: string | null;
          session_id: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          message: string;
          like_count?: number | null;
          created_at?: string | null;
          session_id: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: string;
          message?: string;
          like_count?: number | null;
          created_at?: string | null;
          session_id?: string;
        };
      };
      retro_session_actions: {
        Row: {
          id: string;
          session_id: string;
          user_id: string;
          message: string;
          is_completed: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          session_id: string;
          user_id: string;
          message: string;
          is_completed?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          session_id?: string;
          user_id?: string;
          message?: string;
          is_completed?: boolean | null;
          created_at?: string | null;
        };
      };
      scrum_poker_session_users: {
        Row: {
          id: string;
          created_at: string | null;
          session_id: string;
          user_id: string;
          vote: string | null;
          is_voted: boolean | null;
          user_full_name: string;
          is_active: boolean | null;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          session_id: string;
          user_id: string;
          vote?: string | null;
          is_voted?: boolean | null;
          user_full_name: string;
          is_active?: boolean | null;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          session_id?: string;
          user_id?: string;
          vote?: string | null;
          is_voted?: boolean | null;
          user_full_name?: string;
          is_active?: boolean | null;
        };
      };
      scrum_poker_session: {
        Row: {
          id: string;
          created_by: string;
          created_at: string | null;
          name: string;
        };
        Insert: {
          id?: string;
          created_by: string;
          created_at?: string | null;
          name: string;
        };
        Update: {
          id?: string;
          created_by?: string;
          created_at?: string | null;
          name?: string;
        };
      };
    };
    Views: {
      recent_activities: {
        Row: {
          session_id: string | null;
          user_id: string | null;
          session_name: string | null;
          created_by: string | null;
          type: string | null;
          base_path: string | null;
        };
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}