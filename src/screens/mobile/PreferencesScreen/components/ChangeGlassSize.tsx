import { View } from "react-native";

import { Text } from "@components";
import { NumberSelector } from "./NumberSelector";
import { usePreferencesContext } from "@hooks";

export function ChangeGlassSize() {
  const { glassSize, changePreference } = usePreferencesContext();

  function handleChangeGlassSize(type: "minus" | "plus") {
    changePreference({
      type: "glass-size",
      value: type === "minus" ? glassSize - 50 : glassSize + 50
    })
  }

  return (
    <View className="items-center gap-1">
      <Text className="text-sm text-secondary-text-light dark:text-secondary-text-dark">
        Tamanho do copo
      </Text>

      <NumberSelector
        value={glassSize}
        handleMinus={() => handleChangeGlassSize("minus")}
        handlePlus={() => handleChangeGlassSize("plus")}
      />
    </View>
  )
}
