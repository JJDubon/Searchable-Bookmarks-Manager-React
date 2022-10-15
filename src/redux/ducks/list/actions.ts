import { ListState } from './state';

export function setListState(changes: Partial<ListState>) {
  return {
    type: 'LIST_STATE_SET' as 'LIST_STATE_SET',
    payload: { changes },
  };
}

export function setListStateSuccess(changes: Partial<ListState>) {
  return {
    type: 'LIST_STATE_SET_SUCCESS' as 'LIST_STATE_SET_SUCCESS',
    payload: { changes },
  };
}

export function setListItemOpen(id: string, open: boolean) {
  return {
    type: 'LIST_STATE_SET_OPEN' as 'LIST_STATE_SET_OPEN',
    payload: { id, open },
  };
}

export function setListItemOpenSuccess(id: string, open: boolean) {
  return {
    type: 'LIST_STATE_SET_OPEN_SUCCESS' as 'LIST_STATE_SET_OPEN_SUCCESS',
    payload: { id, open },
  };
}

export type ListStateActions =
  | ReturnType<typeof setListState>
  | ReturnType<typeof setListStateSuccess>
  | ReturnType<typeof setListState>
  | ReturnType<typeof setListItemOpenSuccess>;
