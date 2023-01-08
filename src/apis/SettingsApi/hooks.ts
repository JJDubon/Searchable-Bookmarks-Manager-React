import { useBehaviorSubject } from '../../helpers/RxjsHelpers';
import { useSettingsApi } from '../../providers/ApiProvider/hooks';

export function useSettings() {
  const settingsApi = useSettingsApi();
  const settings = useBehaviorSubject(settingsApi.observables.settings);
  return settings;
}
