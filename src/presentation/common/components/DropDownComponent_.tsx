import colours from '@common/colours';
import { borderRadius } from '@common/constants';
import { useTextStyles } from '@hooks/styles/textStyles';
import { Fonts } from '@hooks/utils/useLoadFonts';
import { Text } from '@rneui/themed';
import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  FadeInUp,
  FadeOutUp,
  LinearTransition,
  SequencedTransition,
} from 'react-native-reanimated';

interface DropDownComponentProps {
  placeholder: string;
  value?: string;
  onValueChange: (item: string) => void;
  data: Array<{
    item: string;
    key: string;
  }>;
}

const DropDownComponent_: React.FC<DropDownComponentProps> = ({
  placeholder,
  value,
  onValueChange,
  data,
}) => {
  const textStyles = useTextStyles();
  const [isVisible, setVisible] = useState<boolean>(false);

  return (
    <Animated.View layout={LinearTransition}>
      <Pressable
        onPress={() => setVisible((item) => !item)}
        style={{
          backgroundColor: colours.white,
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: borderRadius.medium,
        }}
      >
        <Animated.Text
          layout={SequencedTransition}
          style={{ ...textStyles.body, color: colours.textColor }}
        >
          {value || placeholder}
        </Animated.Text>
      </Pressable>
      {isVisible && (
        <Animated.View
          exiting={FadeOutUp}
          entering={FadeInUp}
        >
          {data.map((item, index) => {
            return (
              <Pressable
                key={index}
                style={{
                  backgroundColor: colours.white,
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  borderBottomColor:
                    index < data.length - 1
                      ? colours.black
                      : colours.transparent,
                  borderBottomWidth: 0.5,
                  borderTopStartRadius: index === 0 ? 5 : 0,
                  borderTopEndRadius: index === 0 ? 5 : 0,
                  borderBottomEndRadius: index === data.length - 1 ? 5 : 0,
                  borderBottomStartRadius: index === data.length - 1 ? 5 : 0,
                }}
                onPress={() => {
                  onValueChange(item.item);
                  setVisible(false);
                }}
              >
                <Text style={{ ...textStyles.body, color: colours.textColor }}>
                  {item.item}
                </Text>
              </Pressable>
            );
          })}
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default DropDownComponent_;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontFamily: Fonts.LexendRegular,
    color: colours.textColor,
  },
});
