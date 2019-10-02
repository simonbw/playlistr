import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useStreamContext } from "../contexts/StreamContext";
import {
  useAudioContext,
  resumeIfPaused
} from "../contexts/AudioContextContext";

export default function DeviceSelect() {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [deviceId, setDeviceId] = useState("");
  const { selectDevice: onChange } = useStreamContext();
  const audioContext = useAudioContext();

  async function loadDevices(shouldLoadLocal = false) {
    const userDevices = await navigator.mediaDevices.enumerateDevices();
    const newDevices = userDevices.filter(isAudioDevice).filter(isUniqueDevice);
    setDevices(newDevices);
    console.log("settingDevices", newDevices);

    if (shouldLoadLocal) {
      const defaultDeviceId = localStorage.getItem("defaultDeviceId");
      if (defaultDeviceId) {
        setDeviceId(defaultDeviceId);
      } else if (newDevices.length > 0) {
        setDeviceId(newDevices[0].deviceId);
      }
    }
  }

  useEffect(() => {
    loadDevices(true);
    const handler = () => {
      console.log("devices changed");
      loadDevices();
    };
    if (navigator.mediaDevices) {
      navigator.mediaDevices.addEventListener("devicechange", handler);
      return () =>
        navigator.mediaDevices.removeEventListener("devicechange", handler);
    } else {
      console.error("No media devices available");
    }
  }, []);

  useEffect(() => {
    if (deviceId) {
      localStorage.setItem("defaultDeviceId", deviceId);
    }
    onChange(deviceId);
  }, [deviceId]);

  return (
    <FormControl fullWidth>
      <InputLabel shrink>Audio Source</InputLabel>
      <Select
        value={deviceId}
        onChange={(e: any) => {
          setDeviceId(e.target.value);
          resumeIfPaused(audioContext);
        }}
        displayEmpty
        labelWidth={100}
      >
        {devices.length === 0 && (
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
        )}
        {devices.map((device, i) => (
          <MenuItem value={device.deviceId} key={device.deviceId}>
            {device.label || `Device ${i}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function isAudioDevice(device: MediaDeviceInfo): boolean {
  return device.kind === "audioinput" || device.kind === "audiooutput";
}

function isUniqueDevice(
  device: MediaDeviceInfo,
  index: number,
  devices: MediaDeviceInfo[]
): boolean {
  return device === devices.find(d => d.deviceId === device.deviceId);
}
