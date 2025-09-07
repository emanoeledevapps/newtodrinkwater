import { Screen, Text } from "@components";
import { ChangeGlassSize } from "./components/ChangeGlassSize";
import { View } from "react-native";
import { ChangeBottleSize } from "./components/ChangeBottleSize";
import { ChangeGoal } from "./components/ChangeGoal";

export function PreferencesWatchScreen() {
  return (
    <Screen watch titleWatch="Preferências" showBackWatch>
      <View className="px-5 mt-10 gap-5 mb-10">
        <ChangeGlassSize />
        <ChangeBottleSize />
        <ChangeGoal />

        <Text className="text-secondary-text-dark text-center mt-5">
          Aqui você pode personalizar sua experiência ajustando como deseja acompanhar sua hidratação diária. Defina sua meta de consumo de água, escolha o tamanho do copo que você costuma usar e configure o tamanho da garrafa para facilitar seus registros.
        </Text>
      </View>
    </Screen>
  )
}