import { View } from "react-native";
import { Screen } from "@components";

import { ChangeGlassSize } from "./components/ChangeGlassSize";
import { ChangeBottleSize } from "./components/ChangeBottleSize";

export function PreferencesScreen() { 
  return (
    <Screen title="Preferências" showBackButton>
      <View className="flex-1 w-full h-full items-center justify-center gap-10">
        <ChangeGlassSize />

        <ChangeBottleSize />
      </View>
    </Screen>
  )
}
