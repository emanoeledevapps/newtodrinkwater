import { Icon, Text } from "@components";
import { usePreferencesContext } from "@hooks";
import { TouchableOpacity, View } from "react-native";

interface Props {
  value: number;
  handleMinus: () => void;
  handlePlus: () => void;
}
export function NumberSelector({ handleMinus, handlePlus, value }: Props) {
  const { unit } = usePreferencesContext();

  return (
    <View className="flex-row border border-gray-400 rounded-2xl overflow-hidden h-12">
      <TouchableOpacity
        onPress={handleMinus}
        className="w-10 h-full items-center justify-center"
      >
        <Icon name="chevronLeft" color="gray" />
      </TouchableOpacity>

      <View className="h-full flex-row w-[150px] border-l border-r border-gray-300 items-center justify-center gap-1">
        <Text preset="semibold" className="text-primary-text-light dark:text-primary-text-dark text-lg">
          {Intl.NumberFormat("pt-BR").format(value)}
        </Text>
        <Text className="text-primary-text-light dark:text-primary-text-dark">
          {unit}
        </Text>
      </View>
      <TouchableOpacity
        onPress={handlePlus}
        className="w-10 h-full items-center justify-center"
      >
        <Icon name="chevronRight" color="gray" />
      </TouchableOpacity>
    </View>
  )
}
