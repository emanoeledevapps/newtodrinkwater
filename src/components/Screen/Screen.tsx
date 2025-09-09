import React, { ReactNode } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Header, HeaderProps, Icon, StatusBar, Text } from "@components";
import { useAppSafeArea } from "@hooks";

interface Props extends HeaderProps {
  children: ReactNode;
  scrollable?: boolean;
  hideHeader?: boolean;
  watch?: boolean;
  titleWatch?: string;
  showBackWatch?: boolean
}

export function Screen({ children, scrollable, hideHeader, watch, titleWatch, showBackWatch, ...headerProps }: Props) {
  const navigation = useNavigation();
  const { bottom } = useAppSafeArea();

  if (watch) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ScrollView>
          {titleWatch && (
            <View className="flex-row items-center justify-between mt-14 px-7">
              <View className="w-5">
                {showBackWatch && (
                  <Icon 
                    name="chevronLeft" 
                    color="white" 
                    onPress={() => navigation.goBack()}
                  />
                )}
              </View>
              
              <Text className="text-center text-white">
                {titleWatch}
              </Text>
              
              <View className="w-5"/>
            </View>
          )}
          {children}
        </ScrollView>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View 
        className="flex-1 bg-background dark:bg-black" 
        style={{ paddingBottom: bottom}}
      >
        <StatusBar />
        {!hideHeader && (
          <Header {...headerProps} />
        )}

        {scrollable ? (
          <ScrollView 
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>
        ) : (
          <TouchableWithoutFeedback
            style={{ flex: 1 }}
            onPress={() => Keyboard.dismiss()}
          >
            {children}
          </TouchableWithoutFeedback>
        )}
      </View>
    </KeyboardAvoidingView>
  )
}