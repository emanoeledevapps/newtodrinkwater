import React from "react";
import { Text as RNText, TextStyle } from "react-native";

type RNTextProps = React.ComponentProps<typeof RNText>;
interface Props extends RNTextProps{
  preset?: TextVariants;
  style?: TextStyle;
}

export function Text({children, style, ...restProps}: Props){
  //const fontFamily = getFontFamily(preset);

  return(
    <RNText
      style={[style]}
      {...restProps}
    >
      {children}
    </RNText>
  )
}

function getFontFamily(preset: TextVariants){
  switch(true){
    case preset === 'regular':
      return 'Sora-Regular';
    case preset === 'semibold':
      return 'Sora-SemiBold';
    case preset === 'bold':
      return 'Sora-Bold'
  }
}

type TextVariants = 'regular' | 'bold' | 'semibold';