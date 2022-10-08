import { useSelector } from "react-redux";
import { State } from "../../state";

export function useSettings() {
  return useSelector((state: State) => {
    return state.settings;
  });
}
