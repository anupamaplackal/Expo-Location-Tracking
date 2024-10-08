import colours from '@common/colours';
import { useTextStyles } from '@hooks/styles/textStyles';
import { Input, useTheme } from '@rneui/themed';
import React from 'react';
import { StyleProp, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

interface InputProps extends Partial<TextInputProps> {
  title?: string;
  containerStyle?: StyleProp<ViewStyle>;
  showError?: boolean;
  errorMessage?: string;
}

const Input_: React.FC<InputProps> = ({
  title,
  containerStyle,
  showError,
  errorMessage,
  ...rest
}) => {
  const { theme } = useTheme();

  const textStyles = useTextStyles();

  return (
    <Animated.View
      layout={LinearTransition}
      style={containerStyle}
    >
      {title && <Animated.Text style={styles.title}>{title}</Animated.Text>}
      <Input {...rest} />
      {showError && (
        <Animated.Text
          style={{
            color: theme.colors.error,
          }}
        >
          {errorMessage}
        </Animated.Text>
      )}
    </Animated.View>
  );
};

export default Input_;

const styles = StyleSheet.create({
  title: {
    color: colours.textColor,
    marginBottom: 5,
  },
});
