/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type ActiveRun = Run;

export interface Run {
	id: string;
	name: string;
	start_time_mili: number;
	estimate_string: string;
	estimate_mili: number;
	setup_time_mili: number;
	status: string;
	run_metadata: {
		category: string;
		platform: string;
		twitch_game_name: string;
		twitch_game_id: string;
		run_name: string;
		note: string;
	};
	teams: Team[];
	bids: Bid[];
	schedule_id: string;
}
export interface Team {
	id: string;
	name: string;
	players: User[];
}
export interface User {
	id: string;
	name: string;
	username: string;
	socials: Socials;
}
export interface Socials {
	id: string;
	twitch: string;
	twitter?: string;
	youtube?: string;
	facebook?: string;
}
export interface Bid {
	id: string;
	bidname: string;
	goal: number;
	current_amount: number;
	description: string;
	type: string;
	create_new_options: boolean;
	status: string;
	bid_options: {
		id: string;
		name: string;
		current_amount: number;
		bid_id: string;
	}[];
	run_id: string;
}
