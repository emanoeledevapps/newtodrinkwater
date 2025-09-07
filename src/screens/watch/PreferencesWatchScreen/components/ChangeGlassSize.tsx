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
    <View className="items-center gap-1 max-w-full">
      <Text className="text-secondary-text-dark text-center">
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
