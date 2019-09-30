import getRandomValues from "get-random-values";
import moment from "moment";

export function last<T>(a: readonly T[]): T {
  return a[a.length - 1];
}

function leftPad(s: string | number, minLength = 2, character = "0"): string {
  s = String(s);
  const toPad = Math.max(minLength - s.length, 0);
  return character.repeat(toPad) + s;
}

export function msToTimecode(ms: number): string {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);

  const seconds = leftPad(String(s % 60));
  const minutes = leftPad(String(m % 60));

  if (h > 0) {
    return `${h}:${leftPad(m % 60)}:${seconds}`;
  } else {
    return `${m}:${leftPad(s % 60)}`;
  }
}

export function shortTime(ms: number): string {
  return moment(ms).format("LT");
}

export function longTime(ms: number): string {
  return moment(ms).calendar();
}

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

export function parseTimecode(t?: string): number {
  if (!t) {
    return 0;
  }

  const parts = t.split(":").map(part => parseInt(part));

  let h: number, m: number, s: number;
  if (parts.length === 2) {
    m = parts[0];
    s = parts[1];
    h = 0;
  } else if (parts.length === 3) {
    h = parts[0];
    m = parts[1];
    s = parts[2];
  }

  return s * SECOND + m * MINUTE + h * HOUR;
}

export function generateId() {
  if (typeof window !== "undefined") {
    const entropy = new Uint32Array(2);
    getRandomValues(entropy);
    return Array.from(entropy)
      .map(n => n.toString(32))
      .join("");
  } else {
    const entropy = new Uint8Array(2);
    getRandomValues(entropy);
    return Array.from(entropy)
      .map(n => n.toString(32))
      .join("");
  }
}
