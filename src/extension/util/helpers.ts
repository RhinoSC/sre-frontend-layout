import { Run } from "@sre-frontend-layout/types";
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

export function findRunIndexFromId(id?: string): number {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: readReplicant not in NodeCGServer typings
  const arr = nodecg.readReplicant('runDataArray') as RunDataArray;
  return arr.findIndex((run: Run) => run.id === id);
}

export async function to<T>(promise: Promise<T>): Promise<[Error | null, T?]> {
  try {
    const data = await promise;
    return [null, data];
  } catch (err: any) {
    return [err];
  }
}

function swap(arr: any, index1: number, index2: number) {
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

export function bubbleSort(arr: any) {
  let endIndex = arr.length - 1;
  while (endIndex > 0) {
    let swaps = 0;
    let currentIndex = 0;
    while (currentIndex < endIndex) {
      if (arr[currentIndex].current < arr[currentIndex + 1].current) {
        swap(arr, currentIndex, currentIndex + 1);
        swaps++;
      }
      currentIndex++;
    }
    if (swaps === 0) break;
    endIndex--;
  }
  return arr;
}