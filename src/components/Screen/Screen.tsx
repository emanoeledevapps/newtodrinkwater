import React, { ReactNode } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, View } from "react-native";

import { Header, HeaderProps, StatusBar } from "@components";

interface Props extends HeaderProps {
  children: ReactNode;
  scrollable?: boolean;
  hideHeader?: boolean;
}

export function Screen({ children, scrollable, hideHeader, ...headerProps }: Props) {
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