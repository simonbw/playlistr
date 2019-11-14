import React, { createContext, useContext, useState, useEffect } from "react";
import { generateId, parseTimecode } from "../utils";
import { SongData, songsAreEqual } from "../data/SongData";

interface ContextValue {
  songs: readonly SongData[];
  addSong: (song: SongData, recordingStartTime?: number) => void;
  clearSongs: () => void;
  deleteSong: (songId: string) => void;
  updateSong: (newSong: SongData) => void;
}

const PlaylistContext = createContext<ContextValue>({
  songs: [],
  addSong: () => null,
  clearSongs: () => null,
  deleteSong: () => null,
  updateSong: () => null
});

export function useSongsContext() {
  return useContext(PlaylistContext);
}

function persistSongs(songs: SongData[]) {
  localStorage.setItem("songs", JSON.stringify(songs));
}

function loadSongs(): SongData[] {
  return JSON.parse(localStorage.getItem("songs") || "[]");
}

export const PlaylistProvider = React.memo(({ children }) => {
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
        },
        updateSong: newSong => {
          console.log("updating song", newSong);
          setSongs(songs =>
            songs.map(song => {
              if (song.randomId === newSong.randomId) {
                return newSong;
              } else {
                return song;
              }
            })
          );
        },
        deleteSong: songToDeleteId => {
          setSongs(songs =>
            songs.filter(song => song.randomId !== songToDeleteId)
          );
        }
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
});
