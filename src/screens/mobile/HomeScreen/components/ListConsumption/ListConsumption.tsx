import { View } from "react-native";

import { WaterConsumptionProps } from "@db";
import { DateSelector } from "./DateSelector";

interface Props {
  selectedDate: Date;
  list: WaterConsumptionProps[];
  changeDate: (date: Date) => void;
}
export function ListConsumption({ changeDate, list, selectedDate }: Props) {
  return (
    <View className="w-full px-5">
      <DateSelector selectedDate={selectedDate} changeDate={changeDate} />
    </View>
  )
}