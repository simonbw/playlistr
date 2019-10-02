import { Container } from "@material-ui/core";
import React from "react";
import AudDSettingsDialog from "./AudDSettingsDialog";
import ClearPlaylistButton from "./ClearPlaylistButton";
import CsvButton from "./CsvButton";
import HelpButton from "./HelpButton";
import Identifier from "./Identifier";
import InputContainer from "./InputContainer";
import Songs from "./Songs";

function Layout() {
  return (
    <Container maxWidth="md">
      <header
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between"
        }}
      >
        <h1>Playlistr</h1>
        <HelpButton />
      </header>

      <hr />

      <main>
        <div className="MainContainer">
          <div className="IdentifyContainer">
            <Identifier />
          </div>
          <Songs />
          <div className="PlaylistActions">
            <CsvButton />
            <AudDSettingsDialog />
            <ClearPlaylistButton />
          </div>
        </div>
        <InputContainer />
      </main>
    </Container>
  );
}

export default React.memo(Layout);
