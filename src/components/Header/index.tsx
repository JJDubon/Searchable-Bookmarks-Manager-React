import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useKeyDown } from '../../helpers/BrowserHelpers';
import { searchBookmarks } from '../../redux/ducks/bookmarks/actions';
import { useBookmarksState } from '../../redux/ducks/bookmarks/selectors';
import { useSettings } from '../../redux/ducks/settings/selectors';
import { ignoredSearchKeys } from './ignored-keys';
import { Container, SearchField } from './styles';

interface HeaderProps {
  showSettings: () => void;
}

export const Header = ({ showSettings }: HeaderProps) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLElement>(null);
  const [value, setValue] = useState('');
  const { query } = useBookmarksState();
  const { escapeBehavior } = useSettings();
  const queryExists = query.length !== 0;

  // Either close the extension or clear the search input when the escape button is clicked
  const onEscapePressed = useCallback(
    (e: KeyboardEvent) => {
      if (escapeBehavior === 'clear') {
        if (queryExists) {
          setValue('');
          dispatch(searchBookmarks(''));
        }

        ref.current?.focus();
        e.preventDefault();
      }
    },
    [dispatch, queryExists, escapeBehavior]
  );

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (!ignoredSearchKeys.has(e.key)) {
      ref.current?.focus();
    }
  }, []);

  useKeyDown('Escape', onEscapePressed);
  useKeyDown(null, onKeyDown);

  return (
    <Container>
      <SearchField
        inputRef={ref}
        label='Search bookmarks'
        variant='filled'
        sx={{ '& .MuiInput-underline': { paddingBottom: '4px' } }}
        value={value}
        onChange={(e) => runQuery(e.target.value)}
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton aria-label='search' onClick={() => onSearchIconClick()}>
                {queryExists ? <SearchOffIcon /> : <SearchIcon />}
              </IconButton>
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
    ref.current?.focus();
    if (queryExists) {
      setValue('');
      dispatch(searchBookmarks(''));
    } else {
      dispatch(searchBookmarks(query));
    }
  }
};
