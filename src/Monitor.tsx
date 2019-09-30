import { IconButton } from "@material-ui/core";
import VolumeOffIcon from "@material-ui/icons/VolumeOffRounded";
import VolumeUpIcon from "@material-ui/icons/VolumeUpRounded";
import React, { useEffect, useState } from "react";
import { useAudioContext } from "./contexts/AudioContextContext";
import { useStreamContext } from "./contexts/StreamContext";

export default function Monitor() {
  const context = useAudioContext();
  const [enabled, setEnabled] = useState(false);
  const { source } = useStreamContext();
  const [monitorNode] = useState(() => {
    const node = context.createGain();
    node.gain.value = 0.0;
    node.connect(context.destination);
    return node;
  });

  useEffect(() => {
    monitorNode.gain.value = enabled ? 1.0 : 0.0;
  }, [enabled]);

  useEffect(() => {
    if (source) {
      source.connect(monitorNode);
    }
  }, [source]);

  return (
    <IconButton
      title="Monitor"
      onClick={event => setEnabled(oldEnabled => !oldEnabled)}
    >
      {enabled ? <VolumeUpIcon fill="#07f" /> : <VolumeOffIcon />}
    </IconButton>
  );
}
