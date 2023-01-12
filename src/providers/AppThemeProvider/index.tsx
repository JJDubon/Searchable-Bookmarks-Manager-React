import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSettings } from '../../services/SettingsService/hooks';

declare module '@mui/material/styles' {
  interface Theme {
    backgrounds: {
      offset: (factor: number) => string;
    };
    bookmarks: {
      padding: string;
      lineHeight: string;
    };
  }
  interface ThemeOptions {
    backgrounds?: {
      offset?: (factor: number) => string;
    };
    bookmarks?: {
      padding?: string;
      lineHeight?: string;
    };
  }
}

interface AppThemeProviderProps {
  children?: JSX.Element | JSX.Element[];
}

export const getIndent = (factor: number): number => {
  return 0.6 * factor;
};

export const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
  const settings = useSettings();
  const theme = createTheme({
    palette: {
      mode: settings.palette,
    },
    backgrounds: {
      offset: (factor) => {
        if (settings.palette === 'light') {
          return `rgba(0,0,0,${0.01 * factor})`;
        } else {
          return `rgba(18,18,18,${1 - 0.01 * (factor - 1)})`;
        }
      },
    },
    bookmarks: {
      padding: '2px',
      lineHeight: settings.lineHeight,
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
