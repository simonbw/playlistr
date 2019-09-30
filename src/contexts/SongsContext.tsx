import React, { createContext, useContext, useState, useEffect } from "react";
import { generateId, parseTimecode } from "../utils";

export interface SongData {
  startedAt?: number;
  title?: string;
  album?: string;
  artist?: string;
  label?: string;
  lyrics?: any;
  release_date?: string;
  timecode?: string;
  randomId?: string;
}

interface ContextValue {
  songs: readonly SongData[];
  addSong: (song: SongData, recordingStartTime?: number) => void;
  clearSongs: () => void;
}

const PlaylistContext = createContext<ContextValue>({
  songs: [],
  addSong: () => null,
  clearSongs: () => null
});

export function usePlaylistContext() {
  return useContext(PlaylistContext);
}

function songsAreEqual(songA?: SongData, songB?: SongData): boolean {
  if (songA === undefined || songB === undefined) {
    return false;
  }
  return (
    songA.title === songB.title &&
    songA.artist === songB.artist &&
    songA.album === songB.album
  );
}

function persistSongs(songs: SongData[]) {
  localStorage.setItem("songs", JSON.stringify(songs));
}

function loadSongs(): SongData[] {
  return JSON.parse(localStorage.getItem("songs") || "[]");
}

export function PlaylistProvider({ children }) {
  const [songs, setSongs] = useState<SongData[]>(() => loadSongs());

  useEffect(() => {
    persistSongs(songs);
  }, [songs]);

  return (
    <PlaylistContext.Provider
      value={{
        songs,
        addSong: (song: SongData, recordingStartTime: number) => {
          setSongs(songs => {
            const newSongData: SongData = {
              ...song,
              startedAt: recordingStartTime - parseTimecode(song.timecode),
              randomId: generateId()
            };
            if (!songsAreEqual(newSongData, songs[0])) {
              return [newSongData, ...songs];
            } else {
              console.log("Same song identified: " + song.title);
              return songs;
            }
          });
        },
        clearSongs: () => {
          setSongs([]);
        }
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}
