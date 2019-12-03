import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { AudDSettingsProvider } from "../contexts/AudDSettingsProvider";
import { IdentifyProvider } from "../contexts/IdentifyContext";
import { PlaylistProvider } from "../contexts/SongsContext";
import { StreamProvider } from "../contexts/StreamContext";
import { theme } from "../theme";
import Layout from "./Layout";
import SimpleErrorBoundary from "./SimpleErrorBoundary";

export default function App() {
  return (
    <SimpleErrorBoundary>
      <AudDSettingsProvider>
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
      </AudDSettingsProvider>
    </SimpleErrorBoundary>
  );
}
