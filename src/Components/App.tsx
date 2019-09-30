import { createMuiTheme, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { IdentifyProvider } from "../contexts/IdentifyContext";
import { PlaylistProvider } from "../contexts/SongsContext";
import { StreamProvider } from "../contexts/StreamContext";
import Layout from "./Layout";
import { theme } from "../theme";

export default function App() {
  return (
    <PlaylistProvider>
      <StreamProvider>
        <IdentifyProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout />
          </ThemeProvider>
        </IdentifyProvider>
      </StreamProvider>
    </PlaylistProvider>
  );
}
