import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { AudDSettingsProvider } from "../contexts/AudDSettingsProvider";
import { IdentifyProvider } from "../contexts/IdentifyContext";
import { PlaylistProvider } from "../contexts/SongsContext";
import { StreamProvider } from "../contexts/StreamContext";
import { theme } from "../theme";
import Layout from "./Layout";

export default function App() {
  return (
    <PlaylistProvider>
      <StreamProvider>
        <IdentifyProvider>
          <ThemeProvider theme={theme}>
            <AudDSettingsProvider>
              <CssBaseline />
              <Layout />
            </AudDSettingsProvider>
          </ThemeProvider>
        </IdentifyProvider>
      </StreamProvider>
    </PlaylistProvider>
  );
}
