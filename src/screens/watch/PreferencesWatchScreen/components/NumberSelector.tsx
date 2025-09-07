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
    <View className="flex-row border border-gray-800 rounded-2xl overflow-hidden h-12">
      <TouchableOpacity
        onPress={handleMinus}
        className="w-10 h-full items-center justify-center disabled:opacity-50"
        disabled={value === 0}
      >
        <Icon name="minus" color="white" />
      </TouchableOpacity>

      <View className={`h-full w-[80] flex-row border-l border-r border-gray-800 items-center justify-center gap-1`}>
        <Text preset="semibold" className="text-white text-lg">
          {Intl.NumberFormat("pt-BR").format(value)}
        </Text>
        <Text className="text-white">
          {unit}
        </Text>
      </View>
      <TouchableOpacity
        onPress={handlePlus}
        className="w-10 h-full items-center justify-center"
      >
        <Icon name="plus" color="white" />
      </TouchableOpacity>
    </View>
  )
}
