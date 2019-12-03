import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slider,
  TextField,
  Typography,
  FormControlLabel,
  Box,
  Fade
} from "@material-ui/core";
import React, { useState } from "react";
import { useAudDSettings } from "../contexts/AudDSettingsProvider";
import { useFlag } from "../hooks/useFlag";

export default function AudDSettingsDialog() {
  const { token } = useAudDSettings();
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
        AudD Settings
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>AudD Settings</DialogTitle>
        <AudDSettingsDialogContent setOpen={setOpen} />
      </Dialog>
    </>
  );
}

function formatMs(ms: number): string {
  return `${Math.round(ms / 1000)}s`;
}

function AudDSettingsDialogContent({
  setOpen
}: {
  setOpen: (open: boolean) => void;
}) {
  const {
    token,
    setToken,
    waitLength,
    setWaitLength,
    recordingLength,
    setRecordingLength
  } = useAudDSettings();

  const [tokenValue, setTokenValue] = useState(token);
  const [waitLengthValue, setWaitLengthValue] = useState(waitLength);
  const [recordingLengthValue, setRecordingLengthValue] = useState(
    recordingLength
  );

  const hasChangedValue = useFlag(
    token !== tokenValue ||
      waitLength !== waitLengthValue ||
      recordingLength !== recordingLengthValue
  );

  return (
    <>
      <DialogContent>
        <Box my={2}>
          <DialogContentText>API Token</DialogContentText>
          <DialogContentText variant="body2">
            Playlistr relies on the AudD music recognition api. It will only let
            you make a few requests without a token. Don't have a token?{" "}
            <a href="https://audd.io/" target="_blank">
              Get one here.
            </a>
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            spellCheck={false}
            value={tokenValue}
            onChange={e => setTokenValue(e.target.value)}
          />
        </Box>
        <Box my={2}>
          <DialogContentText>Recording Length</DialogContentText>
          <DialogContentText variant="body2">
            The length in seconds of the recorded audio clips to send to AudD
            for identification. Longer clips may provide more accurate results,
            but will take longer to send and may exceed AudD's maximum accepted
            file size.
          </DialogContentText>
          <Slider
            color="secondary"
            value={recordingLengthValue}
            onChange={(_, value: number) => setRecordingLengthValue(value)}
            valueLabelDisplay="auto"
            valueLabelFormat={formatMs}
            min={5000}
            max={30000}
            step={1000}
            marks={[
              { value: 5000, label: "5s" },
              { value: 30000, label: "30s" }
            ]}
          />
        </Box>
        <Box my={2}>
          <DialogContentText>Wait Length</DialogContentText>
          <DialogContentText variant="body2">
            The number of seconds to wait between making API calls. Longer
            values will send requests less often, costing less money but also
            possibly missing some songs.
          </DialogContentText>
          <Slider
            color="secondary"
            value={waitLengthValue}
            onChange={(_, value: number) => setWaitLengthValue(value)}
            valueLabelDisplay="auto"
            valueLabelFormat={formatMs}
            min={5000}
            max={120000}
            step={5000}
            marks={[
              { value: 5000, label: "5s" },
              { value: 120000, label: "120s" }
            ]}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant={hasChangedValue ? "outlined" : "text"}
          color="inherit"
          onClick={() => {
            setToken(tokenValue);
            setWaitLength(waitLengthValue);
            setRecordingLength(recordingLengthValue);
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
    </>
  );
}
