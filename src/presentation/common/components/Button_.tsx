import colours from '@common/colours';
import { borderRadius } from '@common/constants';
import { useTextStyles } from '@hooks/styles/textStyles';
import { Text } from '@rneui/themed';
import React from 'react';
import {
  ActivityIndicator,
  ButtonProps,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';

interface ButtonProp extends Partial<ButtonProps> {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  showLoading?: boolean;
  onPress: () => void;
}

const Button_: React.FC<ButtonProp> = ({
  title,
  showLoading = false,
  containerStyle,
  onPress,
  ...rest
}) => {
  const textStyles = useTextStyles();

  return (
    <Animated.View layout={LinearTransition}>
      <Pressable
        style={[styles.container, containerStyle]}
        onPress={!showLoading ? onPress : null}
        android_ripple={{
          color: colours.textColor,
        }}
      >
        <Text
          style={{
            ...textStyles.button,
            ...styles.title,
            opacity: showLoading ? 0 : 1,
          }}
        >
          {title}
        </Text>

        {showLoading && (
          <Animated.View
            style={{ position: 'absolute', alignSelf: 'center' }}
            entering={FadeIn}
            exiting={FadeOut}
            layout={LinearTransition}
          >
            <ActivityIndicator
              size={'small'}
              color={colours.black}
            />
          </Animated.View>
        )}
      </Pressable>
    </Animated.View>
  );
};

export default Button_;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: colours.button,
    borderRadius: borderRadius.large,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    color: colours.black,
    textTransform: 'uppercase',
  },
});
