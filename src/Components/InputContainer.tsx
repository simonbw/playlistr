import { Box, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/KeyboardArrowRightRounded";
import InputIcon from "@material-ui/icons/SettingsInputComponentRounded";
import classNames from "classnames";
import React, { useState } from "react";
import Monitor from "../Monitor";
import DeviceSelect from "./DeviceSelect";
import Visualizer from "./Visualizer";

export default function InputContainer() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <IconButton
        className={classNames("OpenCloseButton", { open })}
        onClick={() => setOpen(!open)}
        size="small"
        style={{ marginLeft: -30, color: "#fff" }}
        title={open ? "Close Input Panel" : "Open Input Panel"}
      >
        <CloseIcon className="CloseIcon" />
        <InputIcon className="InputIcon" />
      </IconButton>
      <div className={classNames("InputContainerBox", { open })}>
        <div className={classNames("InputContainer", { open })}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-end"
            }}
          >
            <DeviceSelect />
            <Monitor />
          </div>
          <Box marginTop="12px">
            <Visualizer type="time" color="#fff" />
          </Box>
        </div>
      </div>
    </>
  );
}
