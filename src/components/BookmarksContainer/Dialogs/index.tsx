import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { setActiveDialog } from '../../../redux/ducks/context/actions';
import { useContextState } from '../../../redux/ducks/context/selectors';
import { AppDialogs } from '../../../redux/ducks/context/state';
import { AddBookmarkDialog } from './add-bookmark-dialog';

export const Dialogs = () => {
  const dispatch = useDispatch();
  const { activeDialog } = useContextState();
  return ReactDOM.createPortal(
    <>
      <AddBookmarkDialog open={activeDialog === AppDialogs.AddBookmark} onClose={() => close()} />
    </>,
    document.body
  );

  function close() {
    dispatch(setActiveDialog(AppDialogs.None));
  }
};
