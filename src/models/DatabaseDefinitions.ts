/* eslint-disable no-unused-vars */
export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

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
