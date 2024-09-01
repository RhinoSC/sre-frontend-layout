import type { User } from "./User";

export interface Team {
  id: string;
  name: string;
  players: User[];
}