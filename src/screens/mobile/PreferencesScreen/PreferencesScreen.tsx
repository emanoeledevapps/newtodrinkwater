import { View } from "react-native";
import { Screen, Text } from "@components";

import { ChangeGlassSize } from "./components/ChangeGlassSize";
import { ChangeBottleSize } from "./components/ChangeBottleSize";
import { ChangeGoal } from "./components/ChangeGoal";

export function PreferencesScreen() { 
  return (
    <Screen title="Preferências" showBackButton>
      <View className="flex-1 w-full h-full items-center justify-center gap-10 px-5">
        <Text className="text-secondary-text-light dark:text-secondary-text-dark text-center">
          Aqui você pode personalizar sua experiência ajustando como deseja acompanhar sua hidratação diária. Defina sua meta de consumo de água, escolha o tamanho do copo que você costuma usar e configure o tamanho da garrafa para facilitar seus registros.
        </Text>
        <ChangeGoal />
        <ChangeGlassSize />
        <ChangeBottleSize />
      </View>
    </Screen>
  )
}
