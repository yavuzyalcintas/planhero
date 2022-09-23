export const ProfilesTable = "profiles";
export interface Profiles {
  id: string;
  username?: string;
  avatar_url?: string;
  website?: string;
  full_name: string;
  updated_at?: string;
}

export const ScrumPokerSessionTable = "scrum_poker_session";
export interface ScrumPokerSession {
  id: string;
  name: string;
  created_at?: string;
  created_by: string;
}

export const ScrumPokerSessionUserTable = "scrum_poker_session_users";
export interface ScrumPokerSessionUser {
  id: string;
  session_id: string;
  user_id: string;
  created_at?: string;
  vote?: string;
  is_voted?: boolean;
  user_full_name: string;
}

export const RetroSessionTable = "retro_session";
export interface RetroSession {
  id: string;
  name: string;
  is_completed: boolean;
  created_by: string;
  created_at?: string;
}

export const RetroSessionActionsTable = "retro_session_actions";
export interface RetroSessionActions {
  id: string;
  session_id: string;
  user_id: boolean;
  message: string;
  is_completed?: boolean;
  created_at?: string;
}

export const RetroSessionMessagesTable = "retro_session_messages";
export interface RetroSessionMessages {
  id: string;
  session_id: string;
  user_id: boolean;
  message: string;
  type: string;
  like_count?: number;
  created_at?: string;
}
