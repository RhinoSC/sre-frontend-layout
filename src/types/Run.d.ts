import type { Team } from "./Team";
import type { Bid } from "./Bid";

export interface Run {
  id: string;
  name: string;
  start_time_mili: number;
  estimate_string: string;
  estimate_mili: number;
  setup_time_mili: number;
  status: string;
  run_metadata: RunMetadata;
  teams: Team[];
  bids?: Bid[];
  schedule_id: string;
}

export interface RunMetadata {
  category: string;
  platform: string;
  twitch_game_name: string;
  twitch_game_id: string;
  run_name: string;
  note: string;
}

export interface TwitchCategory {
  box_art_url: string;
  id: string;
  name: string;
  igdb_id?: string;
}


export interface TwitchCategoriesResponse {
  data: TwitchCategory[];
  message: string;
}