import React, { ReactNode } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, View } from "react-native";

import { Header, HeaderProps, StatusBar, Text } from "@components";

interface Props extends HeaderProps {
  children: ReactNode;
  scrollable?: boolean;
  hideHeader?: boolean;
  watch?: boolean;
  titleWatch?: string;
}

export function Screen({ children, scrollable, hideHeader, watch, titleWatch, ...headerProps }: Props) {
  if (watch) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ScrollView>
          {titleWatch && (
            <Text className="mt-5 text-center text-white">
              {titleWatch}
            </Text>
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
      <View className="flex-1 bg-background dark:bg-black">
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