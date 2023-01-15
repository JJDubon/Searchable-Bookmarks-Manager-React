import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useRef, useState } from 'react';
import { useObserver } from '../../helpers/RxjsHelpers';
import { useBookmarksService, useKeyboardService } from '../../providers/ServiceProvider/hooks';
import { useBookmarksServiceData } from '../../services/BookmarksService/hooks';
import { useContextServiceData } from '../../services/ContextService/hooks';
import { AppDialogs } from '../../services/ContextService/types';
import { useSettings } from '../../services/SettingsService/hooks';
import { ignoredSearchKeys } from '../../services/KeyboardService/ignored-keys';
import { Container, SearchField } from './styles';

interface HeaderProps {
  showSettings: () => void;
}

export const Header = ({ showSettings }: HeaderProps) => {
  const ref = useRef<HTMLElement>(null);
  const bookmarksService = useBookmarksService();
  const keyboardService = useKeyboardService();
  const [value, setValue] = useState('');
  const { query } = useBookmarksServiceData();
  const { escapeBehavior } = useSettings();
  const { activeDialog } = useContextServiceData();
  const queryExists = query.length !== 0;

  useObserver(
    keyboardService.observables.escapeKeyPressed,
    (e) => {
      if (activeDialog !== AppDialogs.None) {
        return;
      }

      if (escapeBehavior === 'clear') {
        if (queryExists) {
          setValue('');
          bookmarksService.search('');
          e.preventDefault();
        }

        ref.current?.focus();
      }
    },
    [activeDialog, escapeBehavior, queryExists, bookmarksService, ref, ref.current]
  );

  useObserver(
    keyboardService.observables.onKeyPressed,
    (e) => {
      if (activeDialog !== AppDialogs.None) {
        return;
      }

      if (!ignoredSearchKeys.has(e.key)) {
        ref.current?.focus();
      }
    },
    [activeDialog, ref, ref.current]
  );

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
                <SettingsOutlinedIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );

  function runQuery(value: string) {
    setValue(value ?? '');
    bookmarksService.search(value ?? '');
  }

  function onSearchIconClick() {
    ref.current?.focus();
    if (queryExists) {
      setValue('');
      bookmarksService.search('');
    } else {
      bookmarksService.search(query);
    }
  }
};
