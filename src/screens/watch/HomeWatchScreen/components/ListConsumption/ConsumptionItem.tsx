import { View } from "react-native";
import { formatInTimeZone } from "date-fns-tz";

import { WaterConsumptionProps } from "@db";
import { Icon, Text } from "@components";
import { usePreferencesContext } from "@hooks";

interface Props {
  data: WaterConsumptionProps
}
export function ConsumptionItem({ data }: Props) {
  const { unit } = usePreferencesContext();

  return (
    <View className="flex-row items-center justify-between w-full border-b border-gray-800 py-3">
      <View className="flex-row items-center gap-1">
        <Icon name="glass" color="#aaa" size={16}/>
        <Text className="text-primary-text-dark">
          +{data.quantity} {unit}
        </Text>
      </View>
        <Text className="text-primary-text-dark">
          {formatInTimeZone(new Date(data.created_at + "Z"), "America/Sao_Paulo", "HH:mm")}
        </Text>
    </View>
  )
}
