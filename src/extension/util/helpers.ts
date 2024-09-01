import { get } from "./nodecg";

const nodecg = get();


export function padTimeNumber(num: number): string {
  return num.toString().padStart(2, '0');
}

export function msToTimeStr(ms: number): string {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor(ms / (1000 * 60 * 60));
  return `${padTimeNumber(hours)
    }:${padTimeNumber(minutes)
    }:${padTimeNumber(seconds)}`;
}
export function timeStrToMS(time: string): number {
  const ts = time.split(':');
  if (ts.length === 2) {
    ts.unshift('00'); // Adds 0 hours if they are not specified.
  }
  return Date.UTC(1970, 0, 1, Number(ts[0]), Number(ts[1]), Number(ts[2]));
}