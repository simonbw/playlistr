import React from "react";
import { useSongsContext } from "../contexts/SongsContext";
import { ExportToCsv } from "export-to-csv";
import { Button } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/ClearRounded";

const exporter = new ExportToCsv();

export default function ClearPlaylistButton() {
  const { clearSongs } = useSongsContext();
  return (
    <Button onClick={() => clearSongs()} style={{ color: "#fff" }} size="small">
      <ClearIcon />
      Clear Playlist
    </Button>
  );
}
