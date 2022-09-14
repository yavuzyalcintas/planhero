export const ScrumPokerSessionTable = "scrum_poker_session";
export interface ScrumPokerSession {
  id: string;
  name: string;
  created_at: Date;
  created_by: string;
}

export const ScrumPokerSessionUserTable = "scrum_poker_session_users";
export interface ScrumPokerSessionUser {
  id: string;
  session_id: string;
  user_id: string;
  created_at: Date;
}
