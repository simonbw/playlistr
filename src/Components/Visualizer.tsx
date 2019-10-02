import { IconButton } from "@material-ui/core";
import BarChartIcon from "@material-ui/icons/EqualizerRounded";
import TimelineIcon from "@material-ui/icons/TimelineRounded";
import React, { useEffect, useState } from "react";
import { useAudioContext } from "../contexts/AudioContextContext";
import { useStreamContext } from "../contexts/StreamContext";
import { useAnimationFrame } from "../hooks/useAnimationFrame";

interface Props {
  type: "time" | "frequency";
  color?: string;
}

export default function Visualizer({ type: initialType, color }: Props) {
  const context = useAudioContext();
  const { source } = useStreamContext();
  const [gain] = useState(() => {
    const gain = context.createGain();
    gain.gain.value = 2.0;
    return gain;
  });
  const [analyser] = useState(() => {
    const analyser = context.createAnalyser();
    gain.connect(analyser);
    return analyser;
  });
  const [buffer, setBuffer] = useState<Uint8Array | null>(null);
  const [type, setType] = useState(initialType);

  useEffect(() => {
    if (type === "frequency") {
      analyser.fftSize = 2 ** 5;
      analyser.smoothingTimeConstant = 0.85;
    } else {
      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 2 ** 11;
    }
    setBuffer(new Uint8Array(analyser.frequencyBinCount));
  }, [type]);

  useEffect(() => {
    if (source) {
      source.connect(gain);
    }
  }, [source]);

  useAnimationFrame(() => {
    const newBuffer = new Uint8Array(analyser.frequencyBinCount);
    if (type === "frequency") {
      analyser.getByteFrequencyData(newBuffer);
    } else {
      analyser.getByteTimeDomainData(newBuffer);
    }
    setBuffer(newBuffer);
  });

  if (!buffer) {
    return null;
  }
  return (
    <div className="VisualizerBox">
      <IconButton
        size="small"
        style={{ position: "absolute", top: 4, right: 4 }}
        onClick={() =>
          setType(oldType => (oldType === "frequency" ? "time" : "frequency"))
        }
      >
        {type === "frequency" ? <BarChartIcon /> : <TimelineIcon />}
      </IconButton>
      <svg
        shapeRendering="geometricPrecision"
        preserveAspectRatio="none"
        className="Visualizer"
        viewBox={`0 0 ${buffer.length} 1`}
      >
        {type === "frequency"
          ? renderFrequencyContent(buffer, color)
          : renderTimeContent(buffer, color)}
      </svg>
    </div>
  );
}

function renderFrequencyContent(buffer: Uint8Array, color: string = "#FFFD") {
  return Array.from(buffer).map((value, x) => {
    const height = value / 256.0;
    return (
      <rect
        key={x}
        x={x}
        y={1.0 - height}
        width={1.05}
        height={height}
        fill={color}
        stroke="none"
      />
    );
  });
}

function renderTimeContent(buffer: Uint8Array, color: string = "#FFFD") {
  const points = Array.from(buffer)
    .map((value, x) => {
      const v = value / 256 - 0.5;
      const midpoint = buffer.length / 2;
      const distFromEdge = 1.0 - Math.abs(midpoint - x) / midpoint;
      const d = distFromEdge ** 0.7;
      const y = 0.5 - d * v;
      return [x, y].join(",");
    })
    .join(" ");
  return (
    <polyline stroke={color} fill="none" strokeWidth="0.01" points={points} />
  );
}
