import { useBehaviorSubject } from '../../helpers/RxjsHelpers';
import { useSettingsService } from '../../providers/ServiceProvider/hooks';

export function useSettings() {
  const settingsService = useSettingsService();
  const settings = useBehaviorSubject(settingsService.observables.settings);
  return settings;
}
