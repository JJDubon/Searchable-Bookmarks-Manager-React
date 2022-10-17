import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchBookmarks } from '../../redux/ducks/bookmarks/actions';
import { useBookmarksState } from '../../redux/ducks/bookmarks/selectors';

const Container = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.backgrounds.offset(12) : theme.backgrounds.offset(3),
  borderBottom: `2px solid ${theme.backgrounds.offset(8)}`,
  display: 'flex',
  height: '100%',
  padding: '0 18px',
}));

const SearchField = styled(TextField)(({ theme }) => ({
  alignSelf: 'center',
  width: '100%',
}));

interface HeaderProps {
  showSettings: () => void;
}

export const Header = ({ showSettings }: HeaderProps) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const { query } = useBookmarksState();
  const queryExists = query.length !== 0;
  return (
    <Container>
      <SearchField
        label='Search bookmarks'
        variant='standard'
        sx={{ '& .MuiInput-underline': { paddingBottom: '4px' } }}
        value={value}
        onChange={(e) => runQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <IconButton aria-label='search' onClick={() => onSearchIconClick()}>
                {queryExists ? <SearchOffIcon /> : <SearchIcon />}
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton aria-label='settings' onClick={() => showSettings()}>
                <SettingsIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );

  function runQuery(value: string) {
    setValue(value ?? '');
    dispatch(searchBookmarks(value ?? ''));
  }

  function onSearchIconClick() {
    if (queryExists) {
      setValue('');
      dispatch(searchBookmarks(''));
    } else {
      dispatch(searchBookmarks(query));
    }
  }
};
