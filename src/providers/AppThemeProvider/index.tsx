import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppSettings } from '../SettingsProvider';

declare module '@mui/material/styles' {
  interface Theme {
    backgrounds: {
      offset: (factor: number) => string,
    },
    bookmarks: {
      fontColor: string,
      padding: string,
      adjustablePadding: (factor: number) => string,
    }
  }
  interface ThemeOptions {
    backgrounds?: {
      offset?: (factor: number) => string
    },
    bookmarks?: {
      fontColor?: string,
      padding?: string,
      adjustablePadding?: (factor: number) => string,
    }
  }
}

interface AppThemeProviderProps {
  children?: JSX.Element;
}

export const getIndent = (factor: number): number => {
  return 0.8 * factor;
}

export const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
  const settings = useAppSettings();
  const theme = createTheme({
    backgrounds: {
      offset: (factor) => `rgba(0,0,0,${0.01 * factor})`,
    },
    bookmarks: {
      fontColor: "black",
      padding: settings.padding,
      adjustablePadding: (factor: number) => `calc(${settings.padding} * ${factor})`,
    },
  })

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}