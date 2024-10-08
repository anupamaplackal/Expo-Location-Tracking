import colours from '@common/colours';
import { borderRadius } from '@common/constants';
import { useTextStyles } from '@hooks/styles/textStyles';
import { Fonts } from '@hooks/utils/useLoadFonts';
import { Text } from '@rneui/themed';
import React, { useEffect, useMemo } from 'react';
import { ActivityIndicator, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  FadeOutUp,
  LinearTransition,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ContainerViewProps {
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  removePadding?: boolean;
  showLoading?: boolean;
  message?: string;
  showMessage?: boolean;
  showMessageCallback?: (state: boolean) => void;
}

const ContainerView: React.FC<ContainerViewProps> = ({
  children,
  containerStyle,
  removePadding = false,
  showLoading = false,
  message,
  showMessage,
  showMessageCallback,
}) => {
  const textStyles = useTextStyles();
  const insets = useSafeAreaInsets();

  const containerStyles = useMemo(
    () => ({
      flex: 1,
      backgroundColor: colours.background,
      paddingHorizontal: removePadding ? 0 : 15,
      paddingTop: removePadding ? 0 : 20,
      paddingBottom: insets.bottom,
    }),
    [insets.bottom, removePadding]
  );

  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        showMessageCallback && showMessageCallback(false);
      }, 2000);
    }
  }, [showMessage]);

  return (
    <Animated.View
      layout={LinearTransition.delay(400)}
      style={{
        flex: 1,
      }}
    >
      {showMessage && (
        <Animated.View
          entering={FadeInUp}
          exiting={FadeOutUp}
          style={{
            start: 0,
            end: 0,
            top: 0,
            backgroundColor: 'red',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          <Text
            style={{
              ...textStyles.body,
              flex: 1,
            }}
          >
            {message}
          </Text>
          <Text
            style={{
              ...textStyles.h6,
              fontFamily: Fonts.LexendRegular,
              paddingHorizontal: 6,
              borderColor: colours.white,
              borderWidth: 1,
              borderRadius: borderRadius.medium,
            }}
            onPress={() => {
              showMessageCallback && showMessageCallback(false);
            }}
          >
            x
          </Text>
        </Animated.View>
      )}
      <Animated.View
        style={[containerStyles, containerStyle]}
        layout={LinearTransition}
      >
        {children}
      </Animated.View>
      {showLoading && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={{
            position: 'absolute',
            start: 0,
            end: 0,
            top: 0,
            bottom: 0,
            backgroundColor: colours.blackAlphaDark,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator size={'large'} />
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default ContainerView;
