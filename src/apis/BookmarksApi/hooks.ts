import { useBehaviorSubject } from '../../helpers/RxjsHelpers';
import { useBookmarksApi } from '../../providers/ApiProvider/hooks';

export function useBookmark(id: string) {
  const bookmarksApi = useBookmarksApi();
  const map = useBehaviorSubject(bookmarksApi.observables.map, [id]);
  return map[id];
}

export function useBookmarksApiData() {
  const api = useBookmarksApi();
  const map = useBehaviorSubject(api.observables.map);
  const rootNodes = useBehaviorSubject(api.observables.rootNodes);
  const activeNodes = useBehaviorSubject(api.observables.activeNodes);
  const openMap = useBehaviorSubject(api.observables.openMap);
  const searchResultsOpenMap = useBehaviorSubject(api.observables.searchResultsOpenMap);
  const query = useBehaviorSubject(api.observables.query);
  const activePath = useBehaviorSubject(api.observables.activePath);
  const linearList = useBehaviorSubject(api.observables.linearList);
  return { map, rootNodes, activeNodes, openMap, searchResultsOpenMap, query, activePath, linearList };
}
