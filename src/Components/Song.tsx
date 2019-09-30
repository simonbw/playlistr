import { Paper } from "@material-ui/core";
import React from "react";
import { SongData } from "../contexts/SongsContext";
import { shortTime, longTime } from "../utils";

interface SongProps {
  song: SongData;
}

export function Song({ song }: SongProps) {
  return (
    <Paper className="Song">
      <div className="StartedAt" title={longTime(song.startedAt)}>
        {shortTime(song.startedAt)}
      </div>
      <div>
        <span className="Title">{song.title}</span>
        <div className="ArtistAndAlbum">
          <span className="Artist">{song.artist}</span>
          {" — "}
          <span className="Album">{song.album}</span>
        </div>
      </div>
    </Paper>
  );
}
