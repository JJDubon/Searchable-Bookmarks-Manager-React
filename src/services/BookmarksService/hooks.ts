import { useBehaviorSubject } from '../../helpers/RxjsHelpers';
import { useBookmarksService } from '../../providers/ServiceProvider/hooks';

export function useBookmark(id: string) {
  const bookmarksService = useBookmarksService();
  const map = useBehaviorSubject(bookmarksService.observables.map, [id]);
  return map[id];
}

export function useBookmarksServiceData() {
  const service = useBookmarksService();
  const map = useBehaviorSubject(service.observables.map);
  const rootNodes = useBehaviorSubject(service.observables.rootNodes);
  const activeNodes = useBehaviorSubject(service.observables.activeNodes);
  const openMap = useBehaviorSubject(service.observables.openMap);
  const searchResultsOpenMap = useBehaviorSubject(service.observables.searchResultsOpenMap);
  const query = useBehaviorSubject(service.observables.query);
  const activePath = useBehaviorSubject(service.observables.activePath);
  const linearList = useBehaviorSubject(service.observables.linearList);
  return { map, rootNodes, activeNodes, openMap, searchResultsOpenMap, query, activePath, linearList };
}
