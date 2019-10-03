import { Paper, Typography } from "@material-ui/core";
import React from "react";
import { SongData } from "../contexts/SongsContext";
import { shortTime, longTime } from "../utils";

interface SongProps {
  song: SongData;
}

export function Song({ song }: SongProps) {
  return (
    <Paper className="Song">
      <Typography
        className="StartedAt"
        title={longTime(song.startedAt)}
        color="textSecondary"
        variant="body2"
      >
        {shortTime(song.startedAt)}
      </Typography>
      <div>
        <Typography className="Title" color="textPrimary">
          {song.title}
        </Typography>
        <Typography
          className="ArtistAndAlbum"
          variant="body2"
          color="textSecondary"
        >
          <span className="Artist">{song.artist}</span>
          {" — "}
          <span className="Album">{song.album}</span>
        </Typography>
      </div>
    </Paper>
  );
}
