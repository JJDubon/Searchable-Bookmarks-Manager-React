import { createTheme, ThemeProvider } from '@mui/material/styles';

interface AppThemeProviderProps {
  children?: JSX.Element;
}

export const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
  const theme = createTheme({})

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}