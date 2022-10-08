import { createTheme, ThemeProvider } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    backgrounds: {
      offset: (factor: number) => string,
    },
    bookmarks: {
      fontColor: string,
      adjustablePadding: (factor: number) => string,
    }
  }
  interface ThemeOptions {
    backgrounds?: {
      offset?: (factor: number) => string
    },
    bookmarks?: {
      fontColor?: string,
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
  const theme = createTheme({
    backgrounds: {
      offset: (factor) => `rgba(0,0,0,${0.01 * factor})`,
    },
    bookmarks: {
      fontColor: "black",
      adjustablePadding: (factor: number) => `${2 * factor}px`,
    },
  })

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}