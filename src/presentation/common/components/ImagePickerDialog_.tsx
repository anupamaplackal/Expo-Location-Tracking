import colours from '@common/colours';
import { useTextStyles } from '@hooks/styles/textStyles';
import { Text } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Dimensions, Modal, ModalProps, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Button_ from './Button_';

interface ImagePickerDialogProps extends Partial<ModalProps> {
  onImage: (uri: ImagePicker.ImagePickerAsset) => void;
  onCancel: () => void;
}

const ImagePickerDialog_: React.FC<ImagePickerDialogProps> = ({
  onImage,
  onCancel,
  ...rest
}) => {
  const textStyles = useTextStyles();
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const launchCamera = async () => {
    requestPermission();

    const result = await ImagePicker.launchCameraAsync();

    console.log(result);

    if (!result.canceled) {
      onImage(result.assets[0]);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      onImage(result.assets[0]);
    }
  };
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
            {'Background Location Permission required'}
          </Text>
          <Text style={{ ...textStyles.body, color: colours.black }}>
            {'Allow location permission as "Allow all the time" on next screen'}
          </Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-around',
              flexDirection: 'row',
              marginTop: Dimensions.get('screen').width / 10,
            }}
          >
            <Button_
              title={'Camera'}
              onPress={launchCamera}
            />
            <Button_
              title={'library'}
              onPress={pickImage}
            />
            <Button_
              title={'Cancel'}
              onPress={onCancel}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ImagePickerDialog_;
