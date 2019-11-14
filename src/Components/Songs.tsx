import React from "react";
import { useSongsContext } from "../contexts/SongsContext";
import { Song } from "./Song";

export default function Songs() {
  const { songs, deleteSong, updateSong } = useSongsContext();
  return (
    <div className="SongsContainer">
      {songs.map(song => (
        <Song
          key={`${song.randomId}`}
          song={song}
          onDelete={() => deleteSong(song.randomId)}
          onUpdate={updateSong}
        />
      ))}
    </div>
  );
}
