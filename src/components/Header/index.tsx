import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const Container = styled('div')(({ theme }) => ({
  backgroundColor: theme.backgrounds.offset(3),
  borderBottom: `2px solid ${theme.backgrounds.offset(8)}`,
  display: "flex",
  height: "100%",
  padding: "0 18px",
}));

const SearchField = styled(TextField)(({ theme }) => ({
  alignSelf: "center",
  width: "100%",
}));

export const Header = () => {
  return (
    <Container>
      <SearchField 
        label="Search bookmarks" 
        variant="standard"
        InputProps = {
          {
            startAdornment: (
              <InputAdornment position="start">
                <IconButton aria-label="search">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="settings">
                  <SettingsIcon />
                </IconButton>
              </InputAdornment>
            )
          }
        }
        />
      </Container>
  )
}