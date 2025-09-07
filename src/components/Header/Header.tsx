import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon, Text } from "@components";
import { useNavigation } from "@react-navigation/native";

export interface HeaderProps {
  showBackButton?: boolean;
  title?: string;
}

export function Header({ title, showBackButton }: HeaderProps) {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <View className="w-full h-[70px] flex-row items-center justify-between px-5 border-b bg-primary-light border-text-secondary">
      <View className="w-10">
        {showBackButton && (
          <TouchableOpacity className="w-10" onPress={handleGoBack}>
            <Icon name="chevronLeft" size={30} />
          </TouchableOpacity>
        )}
      </View>

      <Text className="font-semibold text-lg text-white">{title}</Text>

      <View className="w-10" />
    </View>
  )
}