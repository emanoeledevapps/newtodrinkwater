import React, { ReactNode } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, View } from "react-native";

import { StatusBar } from "@components";

interface Props {
  children: ReactNode
  scrollable?: boolean
}

export function Screen({ children, scrollable }: Props) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View className="flex-1 bg-background dark:bg-background-dark">
        <StatusBar />

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