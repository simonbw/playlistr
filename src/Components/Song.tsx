import { Button, IconButton, Paper, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/CloseRounded";
import EditIcon from "@material-ui/icons/EditRounded";
import React, { useState } from "react";
import { useSongsContext } from "../contexts/SongsContext";
import { SongData } from "../data/SongData";
import { longTime, shortTime } from "../utils";
import AutocompleteInput from "./AutocompletInput";

interface SongProps {
  song: SongData;
  onDelete: () => void;
  onUpdate: (newSong: SongData) => void;
}

export function Song({ song, onDelete, onUpdate }: SongProps) {
  const [isEditing, setEditing] = useState(false);

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
      {isEditing ? (
        <EditInfo
          song={song}
          onSave={newSong => {
            onUpdate(newSong);
            setEditing(false);
          }}
          onDelete={onDelete}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <SongInfo song={song} />
      )}
      <IconButton
        onClick={() => setEditing(!isEditing)}
        size="small"
        className="CornerButton"
        title={isEditing ? "Cancel Editing" : "Edit Info"}
      >
        {isEditing ? <CloseIcon /> : <EditIcon />}
      </IconButton>
    </Paper>
  );
}

function SongInfo({ song }: { song: SongData }) {
  return (
    <div className="SongInfo">
      <Typography className="Title" color="textPrimary">
        {song.title || <span className="unknown">No title</span>}
      </Typography>
      <Typography
        className="ArtistAndAlbum"
        variant="body2"
        color="textSecondary"
      >
        {song.artist || <span className="unknown">No artist</span>}
        {" — "}
        {song.album || <span className="unknown">No album</span>}
      </Typography>
    </div>
  );
}

interface EditInfoProps {
  readonly song: SongData;
  readonly onSave: (updatedSong: SongData) => void;
  readonly onDelete: () => void;
}

function EditInfo({ song: initialSong, onSave, onDelete }: EditInfoProps) {
  const [song, setSong] = useState(initialSong);

  const { songs } = useSongsContext();
  const titles = Array.from(new Set(songs.map(s => s.title).filter(x => x)));
  const artists = Array.from(new Set(songs.map(s => s.artist).filter(x => x)));
  const albums = Array.from(new Set(songs.map(s => s.album).filter(x => x)));

  return (
    <div className="EditInfo">
      <div
        className="Fields"
        onKeyDown={e => {
          if (e.key === "Enter") {
            onSave(song);
          }
        }}
      >
        <AutocompleteInput
          className="Title"
          label="Title"
          value={song.title}
          onChange={value => setSong({ ...song, title: value })}
          options={titles}
        />
        <AutocompleteInput
          className="Artist"
          label="Artist"
          value={song.artist}
          onChange={value => setSong({ ...song, artist: value })}
          options={artists}
        />
        <AutocompleteInput
          className="Album"
          label="Album"
          value={song.album}
          onChange={value => setSong({ ...song, album: value })}
          options={albums}
        />
      </div>
      <div className="Buttons">
        <Button
          color="primary"
          onClick={() => onSave(song)}
          size="small"
          style={{ textTransform: "none" }}
          variant="outlined"
        >
          Save
        </Button>

        <Button
          color="default"
          onClick={onDelete}
          size="small"
          style={{
            textTransform: "none",
            backgroundColor: "red",
            color: "#fff"
          }}
          variant="text"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
