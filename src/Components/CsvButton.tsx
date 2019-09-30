import { Button } from "@material-ui/core";
import BarChartIcon from "@material-ui/icons/BarChartRounded";
import { ExportToCsv } from "export-to-csv";
import React from "react";
import { SongData, usePlaylistContext } from "../contexts/SongsContext";

const exporter = new ExportToCsv();

function formatSongsForCsv(songs: readonly SongData[]) {
  return songs;
}

export default function CsvButton() {
  const { songs } = usePlaylistContext();
  return (
    <Button
      onClick={() => exporter.generateCsv(formatSongsForCsv(songs))}
      style={{ color: "#fff" }}
      size="small"
      title="Export playlist as a CSV file"
    >
      <BarChartIcon />
      CSV
    </Button>
  );
}
