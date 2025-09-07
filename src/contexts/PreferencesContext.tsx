import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

interface SavedPreferencesProps {
  goal: number;
  glassSize: number;
  bottleSize: number;
  unit: string;
}

interface ChangePreferenceProps {
  value: number;
  type: "glass-size" | "bottle-size" | "goal"
}

interface PreferencesProviderProps {
  children: ReactNode;
}

export interface PreferencesContextProps {
  goal: number;
  glassSize: number;
  bottleSize: number;
  unit: string;
  darkMode: boolean;
  changePreference: (data: ChangePreferenceProps) => void;
}

export const PreferencesContext = createContext({} as PreferencesContextProps);

export function PreferecesProvider({ children }: PreferencesProviderProps) {
  const darkMode = useColorScheme() === "dark";
  const [goal, setGoal] = useState<number>(2000);
  const [glassSize, setGlassSize] = useState<number>(100);
  const [bottleSize, setBottleSize] = useState<number>(500);
  const [unit, setUnit] = useState<string>("ml");

  useEffect(() => {
    checkSavedPreferences();
  }, [])

  async function checkSavedPreferences() {
    const response = await AsyncStorage.getItem("saved-preferences")
    if (response) {
      const saved = JSON.parse(response) as SavedPreferencesProps
      setUnit(saved.unit);
      setGlassSize(saved.glassSize);
      setBottleSize(saved.bottleSize);
      setGoal(saved.goal)
    }
  }

  async function savePreferences(data: SavedPreferencesProps) {
    await AsyncStorage.setItem("saved-preferences", JSON.stringify(data));
  }

  async function changePreference(data: ChangePreferenceProps) {
    const { type, value } = data;
    if (type === "bottle-size") {
      setBottleSize(value);
      savePreferences({
        bottleSize: value,
        glassSize,
        goal,
        unit
      })
    }

    if (type === "glass-size") {
      setGlassSize(value);
      savePreferences({
        bottleSize,
        glassSize: value,
        goal,
        unit
      })
    }

    if (type === "goal") {
      setGoal(value);
      savePreferences({
        bottleSize,
        glassSize,
        goal: value,
        unit
      })
    }
  }

  return (
    <PreferencesContext.Provider
      value={{ goal, glassSize, unit, darkMode, bottleSize, changePreference }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}
