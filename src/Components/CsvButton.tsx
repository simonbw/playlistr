import { Button } from "@material-ui/core";
import BarChartIcon from "@material-ui/icons/BarChartRounded";
import { ExportToCsv } from "export-to-csv";
import moment from "moment";
import React from "react";
import { useSongsContext } from "../contexts/SongsContext";
import { SongData } from "../data/SongData";

function formatSongForCsv(song: SongData) {
  return {
    "Played At": moment(song.startedAt).format(),
    Title: song.title || "",
    Artist: song.artist || "",
    Album: song.album || "",
    "Release Date": song.release_date || "",
    Label: song.label || ""
  };
}

function generatePlaylistCsv(songs: readonly SongData[]) {
  const exporter = new ExportToCsv({
    title: `Playlister - ${moment().format()}`,
    filename: `Playlister - ${moment().format()}`,
    useKeysAsHeaders: true
  });
  const formattedSongs = songs.map(song => formatSongForCsv(song));
  exporter.generateCsv(formattedSongs);
}

export default function CsvButton() {
  const { songs } = useSongsContext();
  return (
    <Button
      onClick={() => generatePlaylistCsv(songs)}
      style={{ color: "#fff" }}
      size="small"
      title="Export playlist as a CSV file"
    >
      <BarChartIcon />
      CSV
    </Button>
  );
}
