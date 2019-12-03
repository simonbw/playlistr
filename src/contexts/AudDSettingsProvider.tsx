import React, { createContext, useState, useContext, useEffect } from "react";

const SETTINGS_KEY = "AUD_D_SETTINGS";

interface AudDSettingsState {
  token: string;
  waitLength: number;
  recordingLength: number;
}

const defaultSettings: AudDSettingsState = {
  token: "",
  waitLength: 30000,
  recordingLength: 10000
};

interface AudDSettings extends AudDSettingsState {
  setToken: (token: string) => void;
  setWaitLength: (waitLength: number) => void;
  setRecordingLength: (recordingLength: number) => void;
}

const AudDSettingsContext = createContext<AudDSettings>({
  ...defaultSettings,
  setToken: () => null,
  setWaitLength: () => null,
  setRecordingLength: () => null
});

export const AudDSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const loadedSettings = JSON.parse(
      localStorage.getItem(SETTINGS_KEY) || "{}"
    );
    return {
      token: loadedSettings.token || defaultSettings.token,
      waitLength: loadedSettings.waitLength || defaultSettings.waitLength,
      recordingLength:
        loadedSettings.recordingLength || defaultSettings.recordingLength
    };
  });

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  return (
    <AudDSettingsContext.Provider
      value={{
        ...settings,
        setToken: token => setSettings(settings => ({ ...settings, token })),
        setWaitLength: waitLength =>
          setSettings(settings => ({ ...settings, waitLength })),
        setRecordingLength: recordingLength =>
          setSettings(settings => ({ ...settings, recordingLength }))
      }}
    >
      {children}
    </AudDSettingsContext.Provider>
  );
};

export function useAudDSettings() {
  return useContext(AudDSettingsContext);
}
