import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type SettingsContextType = {
  fontSize: string,
  padding: string,
  noWrap: boolean,
}

const defaultValues: SettingsContextType = {
  fontSize: "14px",
  padding: "2px",
  noWrap: true,
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
    const settingsKeys: (keyof SettingsContextType)[] = ['fontSize', 'padding', 'noWrap'];
    chrome.storage.local.get(settingsKeys, (storedValues) => {
      setSettings({
        fontSize: storedValues.fontSize || defaultValues.fontSize,
        padding: storedValues.padding || defaultValues.padding,
        noWrap: storedValues.noWrap === undefined ? defaultValues.noWrap : storedValues.noWrap === true
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
  }, [refreshSettings]);

  return (
    <SettingsContext.Provider value={settings}>
      {!loading && children}
    </SettingsContext.Provider>
  );
}