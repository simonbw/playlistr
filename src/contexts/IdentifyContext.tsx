import React, { createContext, useContext, useEffect, useState } from "react";
import { identifyAudioBlob } from "../api";
import { recordAudioBlob } from "../recordAudioBlob";
import { useAudDSettings } from "./AudDSettingsProvider";
import { useSongsContext } from "./SongsContext";
import { useStreamContext } from "./StreamContext";
import { useAudioContext, resumeIfPaused } from "./AudioContextContext";
import { songIsUnknown } from "../data/SongData";

type Status = "recording" | "identifying" | "waiting" | "stopped";

const DEFAULT_WAIT_TIME = 20000;
const DEFAULT_RECORD_TIME = 10000;

const IdentifyContext = createContext<{
  status: Status;
  startedAt?: number;
  start?: () => void;
  stop: () => void;
  forceIdentifyNow?: () => void;
}>({
  status: "stopped",
  stop: () => null
});

export function useIdentifyContext() {
  return useContext(IdentifyContext);
}

export const IdentifyProvider = React.memo(({ children }) => {
  const audioContext = useAudioContext();
  const { token } = useAudDSettings();
  const { source } = useStreamContext();
  const { addSong, addUnknownSong, songs } = useSongsContext();
  const [status, setStatus] = useState<Status>("stopped");
  const [waitTime] = useState(DEFAULT_WAIT_TIME);

  async function recordAndIdentify() {
    setStatus("recording");
    const { blob, startTime: recordingStartTime } = await recordAudioBlob(
      source,
      DEFAULT_RECORD_TIME
    );
    // playAudioBlob(blob);
    try {
      setStatus("identifying");
      const identityData = await identifyAudioBlob(blob, token);
      if (identityData) {
        addSong(identityData, recordingStartTime);
      } else {
        if (!songs[0] || !songIsUnknown(songs[0])) {
          addUnknownSong();
        }
      }
      setStatus("waiting");
      console.log("waiting...");
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (status === "waiting") {
      const handle = setTimeout(() => recordAndIdentify(), waitTime);
      return () => clearTimeout(handle);
    }
  }, [status]);

  function start() {
    resumeIfPaused(audioContext);
    if (status === "stopped") {
      recordAndIdentify();
    }
  }

  function stop() {
    setStatus("stopped");
  }

  function forceIdentifyNow() {
    if (status === "waiting") {
      recordAndIdentify();
    }
  }

  return (
    <IdentifyContext.Provider
      value={{
        status,
        start,
        stop,
        forceIdentifyNow
      }}
    >
      {children}
    </IdentifyContext.Provider>
  );
});
