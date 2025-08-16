import { createContext, ReactNode, useState } from "react";
import { useColorScheme } from "react-native";

interface PreferencesProviderProps {
  children: ReactNode;
}

export interface PreferencesContextProps {
  goal: number;
  glassSize: number;
  unit: string;
  darkMode: boolean;
}

export const PreferencesContext = createContext({} as PreferencesContextProps);

export function PreferecesProvider({ children }: PreferencesProviderProps) {
  const darkMode = useColorScheme() === "dark";
  const [goal, setGoal] = useState<number>(2000);
  const [glassSize, setGlassSize] = useState<number>(100);
  const [unit, setUnit] = useState<"ml">("ml");

  return (
    <PreferencesContext.Provider
      value={{ goal, glassSize, unit, darkMode }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}
