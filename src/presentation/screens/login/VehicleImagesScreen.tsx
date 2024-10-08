import images from '@assets/images/images';
import colours from '@common/colours';
import { borderRadius } from '@common/constants';
import Button_ from '@components/Button_';
import ContainerView from '@components/ContainerView';
import ImagePickerDialog_ from '@components/ImagePickerDialog_';
import { CreateProfileRequest } from '@hooks/services/types/user/create/CreateProfileRequest';
import useFileUploadApi from '@hooks/services/useFileUploadApi';
import useUserApi from '@hooks/services/useUserApi';
import { useTextStyles } from '@hooks/styles/textStyles';
import { Text, useTheme } from '@rneui/themed';
import useAppStateStore from '@state/useAppStateStore';
import useUserStateStore from '@state/useUserStateStore';
import { AxiosProgressEvent } from 'axios';
import { ImagePickerAsset } from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import { LoginStackScreenProps } from './LoginNavigation';

const VehicleImagesScreen: React.FC<
  LoginStackScreenProps<'vehicleImagesScreen'>
> = ({ navigation }) => {
  const textStyles = useTextStyles();
  const { setAppState } = useAppStateStore();
  const { user, setUser } = useUserStateStore();
  const { updateProfileApi } = useUserApi();
  const { fileUpload } = useFileUploadApi();

  const [isLoading, setloading] = useState<boolean>(false);

  useEffect(() => {
    if (updateProfileApi.response) {
      setUser(updateProfileApi.response.userProfile);
    }
  }, [updateProfileApi.response]);

  useEffect(() => {
    if (fileUpload.response) {
      const updateLicenseRequest: CreateProfileRequest = {
        vehicle_images: [
          ...(user?.vehicle_images ? user?.vehicle_images : []),
          fileUpload.response.files ? fileUpload.response.files[0].url : '',
        ],
      };
      console.log('fileUpload.updateLicenseRequest \n', updateLicenseRequest);
      updateProfileApi.execute(updateLicenseRequest);
    }
  }, [fileUpload.response]);

  const onNext = () => {
    setAppState('home');
  };

  const uploadImage = (selectedImage: ImagePickerAsset) => {
    const file = {
      uri: selectedImage?.uri,
      type: selectedImage?.mimeType,
      name: selectedImage?.fileName,
    };
    fileUpload.execute({
      file,
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        const total = progressEvent.total || 0;
        const current = progressEvent.loaded || 0;
        const percentCompleted = Math.round((current / total) * 100);
        console.log(`${percentCompleted} %`);
      },
    });
  };

  return (
    <ContainerView
      containerStyle={{
        justifyContent: 'center',
      }}
      showLoading={isLoading}
    >
      <Text
        style={{
          position: 'absolute',
          top: 10,
          start: 10,
        }}
        onPress={() => navigation?.goBack()}
      >
        Back
      </Text>
      <Text style={textStyles.h4}>Upload your vehicle Images</Text>
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <ImageComponent onImageSelected={uploadImage} />
        <ImageComponent onImageSelected={uploadImage} />
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <ImageComponent onImageSelected={uploadImage} />
        <ImageComponent onImageSelected={uploadImage} />
      </View>

      <Button_
        onPress={onNext}
        showLoading={fileUpload.isLoading || updateProfileApi.isLoading}
        title={'Continue'}
        containerStyle={{
          marginTop: 80,
        }}
      />
    </ContainerView>
  );
};

export default VehicleImagesScreen;

interface ImageComponentProps {
  onImageSelected: (uri: ImagePickerAsset) => void;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ onImageSelected }) => {
  const textStyles = useTextStyles();
  const { theme } = useTheme();
  const [selectedImage, setSelectedImageURI] = useState<ImagePickerAsset>();
  const [showImagePicker, setShowImagePicker] = useState<boolean>(false);

  return (
    <View
      style={{
        height: Dimensions.get('screen').height / 8,
        flex: 1,
        backgroundColor: colours.white,
        borderRadius: borderRadius.large,
        margin: 5,
        overflow: 'hidden',
        borderColor: theme.colors.divider,
        borderWidth: 2,
      }}
    >
      <TouchableOpacity
        style={{
          height: '100%',
          width: '100%',
        }}
        onPress={() => setShowImagePicker(true)}
      >
        <Image
          style={{
            height: '100%',
            width: '100%',
          }}
          resizeMode='center'
          source={
            selectedImage ? { uri: selectedImage.uri } : images.driversLicense
          }
        />
      </TouchableOpacity>
      {selectedImage && (
        <Text
          style={{
            position: 'absolute',
            end: 0,
            bottom: 0,
            padding: 5,
            margin: 10,
            ...textStyles.caption,
            borderStyle: 'dotted',
            borderRadius: borderRadius.medium,
            borderWidth: 3,
            borderColor: colours.whiteAlpha,
            color: theme.colors.primary,
          }}
          onPress={() => setShowImagePicker(true)}
        >
          Choose Image
        </Text>
      )}

      <ImagePickerDialog_
        onCancel={() => setShowImagePicker(false)}
        visible={showImagePicker}
        onImage={(uri) => {
          onImageSelected(uri);
          setSelectedImageURI(uri);
          setShowImagePicker(false);
        }}
      />
    </View>
  );
};
