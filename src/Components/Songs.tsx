import { IconButton } from "@material-ui/core";
import React, { Fragment } from "react";
import insertIconUrl from "../../images/InsertIcon.svg";
import { useSongsContext } from "../contexts/SongsContext";
import { Song } from "./Song";

export default function Songs() {
  const { songs, deleteSong, updateSong } = useSongsContext();
  return (
    <div className="SongsContainer">
      {songs.map((song, i) => (
        <Fragment key={`${song.randomId}`}>
          <AddSongButton index={i} />
          <Song
            song={song}
            onDelete={() => deleteSong(song.randomId)}
            onUpdate={updateSong}
          />
        </Fragment>
      ))}
    </div>
  );
}

function AddSongButton({ index }: { index: number }) {
  const { addUnknownSong } = useSongsContext();
  return (
    <IconButton
      size="small"
      color="primary"
      className="AddSongButton"
      title="Add blank song"
      onClick={() => addUnknownSong(index)}
    >
      <img
        src={insertIconUrl}
        style={{ height: 24, width: 24, stroke: "#FFF" }}
      />
    </IconButton>
  );
}
