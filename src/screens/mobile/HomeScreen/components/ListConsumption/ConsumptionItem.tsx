import { View } from "react-native";
import { formatInTimeZone } from "date-fns-tz";

import { WaterConsumptionProps } from "@db";
import { Icon, Text } from "@components";

interface Props {
  data: WaterConsumptionProps
}
export function ConsumptionItem({ data }: Props) {
  return (
    <View className="flex-row items-center justify-between w-full border-b border-gray-300 dark:border-background-dark py-2">
      <View className="">
        <Text className="text-primary-text-light dark:text-primary-text-dark">
          +{data.quantity} ml
        </Text>
        <Icon name="glass" color="#aaa"/>
      </View>
        <Text className="text-primary-text-light dark:text-primary-text-dark">
          {formatInTimeZone(new Date(data.created_at + "Z"), "America/Sao_Paulo", "HH:mm")}
        </Text>
    </View>
  )
}
