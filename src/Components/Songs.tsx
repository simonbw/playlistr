import React from "react";
import { usePlaylistContext } from "../contexts/SongsContext";
import { Song } from "./Song";

export default function Songs() {
  const { songs } = usePlaylistContext();
  return (
    <div className="SongsContainer">
      {songs.map(song => (
        <Song
          key={`${song.randomId}–${song.artist}—${song.album}`}
          song={song}
        />
      ))}
    </div>
  );
}
