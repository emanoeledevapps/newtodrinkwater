/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { TouchableOpacity, View, AppState } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { watchEvents } from "react-native-wear-connectivity";

import { connectivityService, MessageGetListDay, MessageListDayProps, MessageType } from "@connectivity";
import { dbService, useGetConsumptionDay } from "@db";
import { Icon, Screen, Text } from "@components";
import { WatchRoutesStackParamsList } from "@routes";

import { Consumption } from "./components/Consumption";
import { ListConsumption } from "./components/ListConsumption/ListConsumption";

type ScreenProps = NativeStackScreenProps<WatchRoutesStackParamsList, "HomeWatchScreen">
export function HomeWatchScreen({ navigation }: ScreenProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { list, totalConsumption, refetch } = useGetConsumptionDay({ date: selectedDate });
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    async function sendMessagesToSmartphone() {
      await connectivityService.sendListDay({origin: "watch", date: selectedDate });
    }
    sendMessagesToSmartphone();
  }, [selectedDate, appState]);
  
  useEffect(() => {
    const sub = AppState.addEventListener("change", nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        setSelectedDate(new Date());
      }
      setAppState(nextAppState);
    });
    
    connectivityService.getListDay({ origin: "watch" });
    return () => sub.remove();
  }, [appState]);

  useEffect(() => {
    const unsubscribe = watchEvents.on('message', (message) => {
      const messageType = message?.type as MessageType;

      if(messageType === "list-day") {
        const msg = message as MessageListDayProps;
        if (msg.messageOrigin === "smartphone") {
          handleRegisterListDay(msg);
        }
      }

      if(messageType === "get-list-day") {
        const msg = message as MessageGetListDay;
        if (msg.messageOrigin === "smartphone") {
          connectivityService.sendListDay({
            origin: "watch",
            date: new Date()
          })
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  
  async function handleRegisterListDay(msg: MessageListDayProps) {
    const listItems = msg.list
    for (let i = 0; i < listItems.length; i++) {
      const item = listItems[i];
      try {
        await dbService.addConsumptionFromConnectivity({
          created_at: item.created_at,
          formatted_date: item.formatted_date,
          id: item.id,
          origin: item.origin,
          quantity: item.quantity,
          register_type: item.register_type
        })
      } catch (e) {
        console.log(e)
      }
    }
    refetch();
  }

  function handleGoToPreferences() {
    navigation.navigate("PreferencesWatchScreen")
  }

  return (
    <Screen watch>
      <Consumption total={totalConsumption} consumptionAdded={refetch} />
      <ListConsumption list={list} />

      <View className="items-center mb-10">
        <TouchableOpacity
          className="px-5 h-10 rounded-full bg-gray-700 items-center justify-center flex-row gap-3"
          onPress={handleGoToPreferences}
        >
          <Icon name="settings" color="white" />
          <Text className="font-bold text-white text-sm">Preferências</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  )
}
