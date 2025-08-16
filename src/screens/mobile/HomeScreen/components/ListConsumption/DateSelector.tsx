import { TouchableOpacity, View } from "react-native";
import { addDays, format, isToday, isYesterday, subDays } from "date-fns";

import { Icon, Text } from "@components";
import { usePreferencesContext } from "@hooks";

interface Props {
  selectedDate: Date;
  changeDate: (date: Date) => void;
}
export function DateSelector({ selectedDate, changeDate }: Props) {
  const { darkMode } = usePreferencesContext();
  const dateString = format(selectedDate, "dd/MM/yyyy");
  const today = isToday(selectedDate);
  const yesterday = isYesterday(selectedDate);

  return (
    <View className="w-full flex-row items-center justify-between">
      <View className="flex-row items-center gap-3">
        <Icon
          name="calendar" 
          color="#aaa"
        />
        <Text className="text-[#aaa]">
          {today ? "Hoje" : yesterday ? "Ontem" : dateString}
        </Text>
      </View>

      <View className="flex-row items-center gap-8">
        <TouchableOpacity
          onPress={() => changeDate(subDays(selectedDate, 1))}
        >
          <Icon
            name="chevronLeft" 
            color={darkMode ? "#E0F2FE" : "#1E3A8A"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => changeDate(addDays(selectedDate, 1))}
          disabled={today}
        >
          <Icon
            name="chevronRight" 
            color={darkMode ? "#E0F2FE" : "#1E3A8A"}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}