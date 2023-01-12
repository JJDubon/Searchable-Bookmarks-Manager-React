import { useBehaviorSubject } from '../../helpers/RxjsHelpers';
import { useContextService } from '../../providers/ServiceProvider/hooks';

export function useContextServiceData() {
  const service = useContextService();
  const open = useBehaviorSubject(service.observables.open);
  const path = useBehaviorSubject(service.observables.path);
  const bookmark = useBehaviorSubject(service.observables.bookmark);
  const position = useBehaviorSubject(service.observables.position);
  const activeDialog = useBehaviorSubject(service.observables.activeDialog);
  return { open, path, bookmark, activeDialog, x: position.x, y: position.y };
}
