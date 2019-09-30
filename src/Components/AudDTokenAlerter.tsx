import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { useAudDToken } from "../contexts/AudDTokenProvider";

const useStyles = makeStyles(theme => ({
  paper: {}
}));

export default function AudDTokenAlerter() {
  const { token, setToken } = useAudDToken();
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(!token);

  return (
    <>
      <Button
        variant="text"
        size="small"
        onClick={() => setOpen(true)}
        style={{ color: "#fff", float: "right", textTransform: "none" }}
        title="AudD Token"
      >
        <img src={require("../../images/audd-logo.png")} width={20} />
        AudD Token
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>AudD Token</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Playlistr relies on the AudD music recognition api. It will only let
            you make a few requests without a token. Don't have a token?{" "}
            <a href="https://audd.io/" target="_blank">
              Get one here.
            </a>
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            value={inputValue}
            label={<code>api_token</code>}
            onChange={e => setInputValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => {
              setToken(inputValue);
              setOpen(false);
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
