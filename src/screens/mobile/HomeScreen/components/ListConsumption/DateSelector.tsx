import { View } from "react-native";
import { format, subDays } from "date-fns";

import { Icon, Text } from "@components";

interface Props {
  selectedDate: Date;
  changeDate: (date: Date) => void;
}
export function DateSelector({ selectedDate, changeDate }: Props) {
  const dateString = format(selectedDate, "dd/MM/yyyy");

  return (
    <View className="w-full flex-row items-center justify-between">
      <View className="flex-row items-center gap-3">
        <View className="w-5 h-5 bg-white"/>
        <Text className="text-primary-text-light dark:text-primary-text-dark">
          {dateString}
        </Text>
      </View>

      <View className="flex-row items-center gap-10">
        <Icon
          name="chevronLeft" 
          color="#aaa"
          onPress={() => changeDate(subDays(selectedDate, 1))}
        />
      </View>
    </View>
  )
}