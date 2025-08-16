import { useContext } from "react";
import { PreferencesContext, PreferencesContextProps } from "@contexts";

export function usePreferencesContext(): PreferencesContextProps {
  return useContext(PreferencesContext);
}
