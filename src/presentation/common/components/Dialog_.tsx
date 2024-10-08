import colours from '@common/colours';
import { useTextStyles } from '@hooks/styles/textStyles';
import { Text } from '@rneui/themed';
import React from 'react';
import { Dimensions, Modal, ModalProps, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Button_ from './Button_';

interface DialogProps extends Partial<ModalProps> {
  title: string;
  message: string;
  buttonsList: Array<{
    text: string;
    onPress: () => void;
  }>;
}

const Dialog_: React.FC<DialogProps> = ({
  title,
  message,
  buttonsList,
  ...rest
}) => {
  const textStyles = useTextStyles();
  return (
    <Modal
      animationType='slide'
      transparent={true}
      collapsable
      {...rest}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Animated.View
          style={{
            backgroundColor: colours.white,
            alignSelf: 'center',
            justifyContent: 'center',
            paddingHorizontal: '4%',
            paddingVertical: '5%',
            marginHorizontal: '5%',
          }}
        >
          <Text style={{ ...textStyles.h5, color: colours.black }}>
            {title}
          </Text>
          <Text style={{ ...textStyles.body, color: colours.black }}>
            {message}
          </Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-around',
              flexDirection: 'row',
              marginTop: Dimensions.get('screen').width / 10,
            }}
          >
            {buttonsList.map((item, index) => {
              return (
                <Button_
                  key={item.text}
                  title={item.text}
                  onPress={item.onPress}
                />
              );
            })}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default Dialog_;
