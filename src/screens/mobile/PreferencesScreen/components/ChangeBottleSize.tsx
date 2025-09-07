import { View } from "react-native";

import { Text } from "@components";
import { NumberSelector } from "./NumberSelector";
import { usePreferencesContext } from "@hooks";

export function ChangeBottleSize() {
  const { bottleSize, changePreference } = usePreferencesContext();

  function handleChangeBottleSize(type: "minus" | "plus") {
    changePreference({
      type: "bottle-size",
      value: type === "minus" ? bottleSize - 50 : bottleSize + 50
    })
  }

  return (
    <View className="items-center gap-1">
      <Text className="text-sm text-secondary-text-light dark:text-secondary-text-dark">
        Tamanho da garrafa
      </Text>

      <NumberSelector
        value={bottleSize}
        handleMinus={() => handleChangeBottleSize("minus")}
        handlePlus={() => handleChangeBottleSize("plus")}
      />
    </View>
  )
}
