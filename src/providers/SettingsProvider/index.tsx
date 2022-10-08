import { createContext, useCallback, useContext, useEffect, useState } from "react";

const keys: (keyof SettingsContextType)[] = ['padding', 'fontSize'];

export type SettingsContextType = {
  fontSize: string,
  padding: string
}

const defaultValues: SettingsContextType = {
  fontSize: "16px",
  padding: "2px"
};

export const SettingsContext = createContext<SettingsContextType>(defaultValues);

export function useAppSettings(): SettingsContextType {
  return useContext(SettingsContext);
}

interface SettingsProviderProps {
  children?: JSX.Element;
}

export const SettingsProvider = ({children}: SettingsProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState(defaultValues);

  const refreshSettings = useCallback((cb?: () => void) => {
    chrome.storage.local.get(keys, (storedValues) => {
      setSettings({
        fontSize: storedValues.fontSize || defaultValues.fontSize,
        padding: storedValues.padding || defaultValues.padding
      });

      if (cb) {
        cb();
      }
    });
  }, []);

  useEffect(() => {
    refreshSettings(() => {
      setLoading(false);
    });
  }, [refreshSettings]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshSettings();
    }, 250);
    return () => clearInterval(intervalId);
  });

  return (
    <SettingsContext.Provider value={settings}>
      {!loading && children}
    </SettingsContext.Provider>
  );
}