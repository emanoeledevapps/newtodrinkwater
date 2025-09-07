import { ConsumptionItem, Screen, Text } from "@components";
import { useGetConsumptionDay } from "@db";
import { usePreferencesContext } from "@hooks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MobileRoutesStackParamsList } from "@routes";
import { format } from "date-fns";
import { View } from "react-native";

type ScreenProps = NativeStackScreenProps<MobileRoutesStackParamsList, "ListScreen">
export function ListScreen({ route }: ScreenProps) {
  const { date } = route.params;
  const { unit } = usePreferencesContext();
  const { list, totalConsumption } = useGetConsumptionDay({ date });

  return (
    <Screen title="Lista de registros" showBackButton scrollable>
      <Text 
        className="text-4xl text-primary-text-light dark:text-primary-text-dark font-bold text-center mt-10"
      >
        {Intl.NumberFormat("pt-BR").format(totalConsumption)} {unit}
      </Text>
      <Text 
        className="text-secondary-text-light dark:text-secondary-text-dark mt-1 font-bold text-center"
      >
        {format(date, "dd/MM/yyyy")}
      </Text>

      <View className="gap-2 mt-10 px-5">
        {list.map((item) => (
          <ConsumptionItem key={item.id} data={item} />
        ))}
      </View>
    </Screen>
  )
}
