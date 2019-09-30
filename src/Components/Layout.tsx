import { Container } from "@material-ui/core";
import React from "react";
import AudDTokenAlerter from "./AudDTokenAlerter";
import ClearPlaylistButton from "./ClearPlaylistButton";
import CsvButton from "./CsvButton";
import HelpButton from "./HelpButton";
import Identifier from "./Identifier";
import InputContainer from "./InputContainer";
import Songs from "./Songs";

interface Props {}

export default function Layout(props: Props) {
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
            <AudDTokenAlerter />
            <ClearPlaylistButton />
          </div>
        </div>
        <InputContainer />
      </main>
    </Container>
  );
}
