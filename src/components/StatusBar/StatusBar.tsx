import { View, StatusBar as RNStatusBar } from "react-native";
import { useAppSafeArea } from "@hooks";

export function StatusBar() {
  const { top } = useAppSafeArea();

  return (
    <View className="bg-primary-light dark:bg-background-dark w-full" style={{ height: top }}>
      <RNStatusBar barStyle="light-content" />
    </View>
  )
}