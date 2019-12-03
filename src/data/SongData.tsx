import { generateId } from "../utils";

export interface SongData {
  // Our id
  randomId?: string;

  // AudD stuff
  startedAt?: number;
  title?: string;
  album?: string;
  artist?: string;
  label?: string;
  release_date?: string;
  timecode?: string;
  lyrics?: any;

  // 3rd party stuff
  apple_music?: any;
  spotify?: any;
  deezer?: any;
}

export function songsAreEqual(songA?: SongData, songB?: SongData): boolean {
  if (songA === undefined || songB === undefined) {
    return false;
  }
  return (
    songA.title === songB.title &&
    songA.artist === songB.artist &&
    songA.album === songB.album
  );
}

export function songIsUnknown(song: SongData): boolean {
  return (
    song.title === "UNKNOWN" &&
    song.artist === "UNKNOWN" &&
    song.album === "UNKNOWN"
  );
}

export function createUnknownSong(): SongData {
  return {
    randomId: generateId(),
    title: "UNKNOWN",
    artist: "UNKNOWN",
    album: "UNKNOWN",
    startedAt: Date.now()
  };
}

console.log(
  "unknown create and identify works:",
  songIsUnknown(createUnknownSong())
);
