import { View } from "react-native";

import { WaterConsumptionProps } from "@db";
import { Text, ConsumptionItem } from "@components";

import { DateSelector } from "./DateSelector";
import { AddConsumption } from "./AddConsumption";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MobileRoutesStackParamsList } from "@routes";
import { useNavigation } from "@react-navigation/native";

type NavigationProps = NativeStackNavigationProp<MobileRoutesStackParamsList, "HomeScreen">

interface Props {
  selectedDate: Date;
  list: WaterConsumptionProps[];
  changeDate: (date: Date) => void;
  consumptionAdded: () => void;
}
export function ListConsumption({ changeDate, list, selectedDate, consumptionAdded }: Props) {
  const navigation = useNavigation<NavigationProps>();

  function handleGoToListScreen() {
    navigation.navigate("ListScreen", { date: selectedDate })
  }
  return (
    <View className="w-full px-5 gap-5 mt-[-120]">
      <View className="p-3 bg-card-light dark:bg-card-dark rounded-2xl">
        <DateSelector selectedDate={selectedDate} changeDate={changeDate} />

        {list.length === 0 ? (
          <EmptyList />
        ) : (
          <View className="gap-2">
            {list.slice(0, 3).map((item) => (
              <ConsumptionItem key={item.id} data={item} />
            ))}

            {list.length > 3 && (
              <Text 
                className="text-primary-text-light dark:text-primary-text-dark my-2 underline text-center"
                onPress={handleGoToListScreen}
              >
                Ver todos os registros
              </Text>
            )}
          </View>
        )}
      </View>
      
      <AddConsumption
        selectedDate={selectedDate}
        consumptionAdded={consumptionAdded}
      />
    </View>
  )
}

function EmptyList() {
  return (
    <View className="h-[200] items-center justify-center">
      <Text className="text-primary-text-light dark:text-primary-text-dark">
        Nenhum registro feito
      </Text>
    </View>
  )
}