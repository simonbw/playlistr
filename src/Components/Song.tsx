import { IconButton, Paper, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/DeleteRounded";
import React from "react";
import { SongData } from "../data/SongData";
import { longTime, shortTime } from "../utils";
import EditableField from "./EditableField";

interface SongProps {
  song: SongData;
  onDelete: () => void;
  onUpdate: (newSong: SongData) => void;
}

export function Song({ song, onDelete, onUpdate }: SongProps) {
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
      <div className="SongInfo">
        <Typography className="Title" color="textPrimary">
          <EditableField
            value={song.title}
            onChange={value => onUpdate({ ...song, title: value })}
          />
        </Typography>
        <Typography
          className="ArtistAndAlbum"
          variant="body2"
          color="textSecondary"
        >
          <EditableField
            className="Artist"
            value={song.artist}
            onChange={value => onUpdate({ ...song, artist: value })}
          />
          {" — "}
          <EditableField
            className="Album"
            value={song.album}
            onChange={value => onUpdate({ ...song, album: value })}
          />
        </Typography>
      </div>
      <IconButton onClick={onDelete} size="small" className="DeleteButton">
        <CloseIcon />
      </IconButton>
    </Paper>
  );
}

function EditableSong({ song }: SongProps) {
  return;
}
