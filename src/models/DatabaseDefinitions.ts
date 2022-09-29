export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      retro_session: {
        Row: {
          name: string;
          created_by: string;
          id: string;
          is_completed: boolean;
          created_at: string | null;
        };
        Insert: {
          name: string;
          created_by: string;
          id?: string;
          is_completed?: boolean;
          created_at?: string | null;
        };
        Update: {
          name?: string;
          created_by?: string;
          id?: string;
          is_completed?: boolean;
          created_at?: string | null;
        };
      };
      retro_session_messages: {
        Row: {
          user_id: string;
          type: string;
          message: string;
          session_id: string;
          id: string;
          like_count: number | null;
          created_at: string | null;
        };
        Insert: {
          user_id: string;
          type: string;
          message: string;
          session_id: string;
          id?: string;
          like_count?: number | null;
          created_at?: string | null;
        };
        Update: {
          user_id?: string;
          type?: string;
          message?: string;
          session_id?: string;
          id?: string;
          like_count?: number | null;
          created_at?: string | null;
        };
      };
      retro_session_actions: {
        Row: {
          session_id: string;
          user_id: string;
          message: string;
          id: string;
          is_completed: boolean | null;
          created_at: string | null;
        };
        Insert: {
          session_id: string;
          user_id: string;
          message: string;
          id?: string;
          is_completed?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          session_id?: string;
          user_id?: string;
          message?: string;
          id?: string;
          is_completed?: boolean | null;
          created_at?: string | null;
        };
      };
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
      scrum_poker_session: {
        Row: {
          created_by: string;
          name: string;
          id: string;
          created_at: string | null;
        };
        Insert: {
          created_by: string;
          name: string;
          id?: string;
          created_at?: string | null;
        };
        Update: {
          created_by?: string;
          name?: string;
          id?: string;
          created_at?: string | null;
        };
      };
      scrum_poker_session_users: {
        Row: {
          session_id: string;
          user_id: string;
          user_full_name: string;
          id: string;
          created_at: string | null;
          vote: string | null;
          is_voted: boolean | null;
        };
        Insert: {
          session_id: string;
          user_id: string;
          user_full_name: string;
          id?: string;
          created_at?: string | null;
          vote?: string | null;
          is_voted?: boolean | null;
        };
        Update: {
          session_id?: string;
          user_id?: string;
          user_full_name?: string;
          id?: string;
          created_at?: string | null;
          vote?: string | null;
          is_voted?: boolean | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
