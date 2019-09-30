import React, { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";

export default function HelpButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton
        onClick={() => setOpen(open => !open)}
        style={{ float: "right", color: "#fff" }}
        size="small"
      >
        <HelpIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>About Playlistr</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Playlistr is a tool to extract a playlist from a stream of audio. It
            listens to an audio stream, and tries to identify songs. When it
            identifies a new song, it adds that song's information to the
            playlist view.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
