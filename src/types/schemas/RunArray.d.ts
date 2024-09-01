/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type Team = {
	id: string;
	name: string;
	players: User;
} & unknown[];
export type User = {
	id: string;
	name: string;
	username: string;
	socials: Socials;
} & unknown[];
export type RunArray = Run[];

export interface Run {
	id: string;
	name: string;
	start_time_mili: number;
	estimate_string?: string;
	estimate_mili: number;
	setup_time_mili: number;
	status: string;
	run_metadata: {
		category?: string;
		platform?: string;
		twitch_game_name?: string;
		twitch_game_id?: string;
		run_name?: string;
		note?: string;
	};
	teams: Team;
	externalID?: string;
}
export interface Socials {
	id: string;
	twitch: string;
	twitter?: string;
	youtube?: string;
	facebook?: string;
}
