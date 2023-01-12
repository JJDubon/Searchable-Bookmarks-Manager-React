import { useBehaviorSubject } from '../../helpers/RxjsHelpers';
import { useActionsService } from '../../providers/ServiceProvider/hooks';

export function useActionsServiceData() {
  const service = useActionsService();
  const stack = useBehaviorSubject(service.observables.stack);
  const currentAction = useBehaviorSubject(service.observables.currentAction);
  return { stack, currentAction };
}
