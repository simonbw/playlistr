import { Button, IconButton } from "@material-ui/core";
import StopIcon from "@material-ui/icons/HighlightOffRounded";
import React from "react";
import { useIdentifyContext } from "../contexts/IdentifyContext";
import { useStreamContext } from "../contexts/StreamContext";
import Ellipses from "./Ellipses";

export default function Identifier() {
  const { status, start, stop } = useIdentifyContext();
  const { source } = useStreamContext();

  switch (status) {
    case "stopped":
      return <StartButton start={start} source={source} />;
    case "waiting":
    default:
      return (
        <div>
          <Listening />
          <StopButton stop={stop} />
        </div>
      );
  }
}

function StartButton({ start, source }) {
  return (
    <Button
      disabled={!start || !source}
      onClick={start}
      variant="outlined"
      style={{ color: "#fff", borderColor: "#fff" }}
    >
      Start Identifying
    </Button>
  );
}

function StopButton({ stop }) {
  return (
    <IconButton onClick={() => stop()} color="inherit" title="Stop identifying">
      <StopIcon />
    </IconButton>
  );
}

function Listening() {
  return (
    <span style={{ letterSpacing: 4, userSelect: "none" }}>
      Identifying
      <Ellipses interval={700} />
    </span>
  );
}
