import React, { createContext, useContext, useEffect, useState } from "react";
import { useAudioContext } from "./AudioContextContext";

interface ContextValue {
  stream?: MediaStream;
  source?: MediaStreamAudioSourceNode;
  selectDevice: (deviceId: string) => void;
}

const StreamContext = createContext<ContextValue>({ selectDevice: () => null });

export function useStreamContext() {
  return useContext(StreamContext);
}

export const StreamProvider = React.memo(({ children }) => {
  const [mediaStream, setMediaStream] = useState<MediaStream | undefined>();
  const [source, setSource] = useState<
    MediaStreamAudioSourceNode | undefined
  >();
  const audioContext = useAudioContext();

  useEffect(() => {
    if (mediaStream) {
      const newSource = audioContext.createMediaStreamSource(mediaStream);
      setSource(newSource);
      return () => newSource.disconnect();
    } else {
      setSource(undefined);
    }
  }, [mediaStream]);

  async function selectDevice(deviceId: string) {
    if (!deviceId) {
      setMediaStream(undefined);
    } else {
      try {
        const deviceStream = await navigator.mediaDevices.getUserMedia({
          audio: { deviceId }
        });
        setMediaStream(deviceStream);
      } catch (e) {
        console.error(e);
        setMediaStream(undefined);
      }
    }
  }

  return (
    <StreamContext.Provider
      value={{
        stream: mediaStream,
        source,
        selectDevice
      }}
    >
      {children}
    </StreamContext.Provider>
  );
});
