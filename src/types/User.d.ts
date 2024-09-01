export interface User {
  id: string;
  name: string;
  username: string;
  socials: Socials;
}

export interface Socials {
  id: string;
  twitch?: string;
  twitter?: string;
  youtube?: string;
  facebook?: string;
}