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
import NavigationConfig from '@navigation/NavigationConfig';
import { Text } from '@rneui/themed';
import { AxiosProgressEvent } from 'axios';
import { ImagePickerAsset } from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, View } from 'react-native';
import { LoginStackScreenProps } from './LoginNavigation';

const DriversLicenseScreen: React.FC<
  LoginStackScreenProps<'driversLicense'>
> = ({ navigation }) => {
  const textStyles = useTextStyles();
  const { fileUpload } = useFileUploadApi();
  const { updateProfileApi } = useUserApi();
  const [message, setMessage] = useState<string>('');
  const [showImagePicker, setShowImagePicker] = useState<boolean>(false);
  const [selectedImage, setSelectedImageURI] = useState<ImagePickerAsset>();

  useEffect(() => {
    if (fileUpload.response) {
      const updateLicenseRequest: CreateProfileRequest = {
        license: [
          fileUpload.response.files ? fileUpload.response.files[0].url : '',
        ],
      };
      console.log('fileUpload.updateLicenseRequest \n', updateLicenseRequest);
      updateProfileApi.execute(updateLicenseRequest);
    }
  }, [fileUpload.response]);
  useEffect(() => {
    if (updateProfileApi.response) {
      setMessage('License Updated');
      navigation?.navigate(NavigationConfig.VehicleImagesScreen);
    }
  }, [updateProfileApi.response]);

  const uploadImage = () => {
    const file = {
      uri: selectedImage?.uri,
      type: selectedImage?.mimeType,
      name: selectedImage?.fileName,
    };
    try {
      fileUpload.execute({
        file,
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const total = progressEvent.total || 0;
          const current = progressEvent.loaded || 0;
          const percentCompleted = Math.round((current / total) * 100);
          console.log(`${percentCompleted} %`);
        },
      });
      console.log('File uploaded successfully!');
    } catch (error) {
      console.error('File upload failed:', error);
    }
  };

  return (
    <ContainerView
      containerStyle={{
        justifyContent: 'center',
      }}
      message={message}
      showMessage={message?.length > 0}
      showMessageCallback={() => setMessage('')}
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
      <Text style={textStyles.h4}>Upload your Drivers License</Text>

      <View
        style={{
          height: Dimensions.get('screen').height / 4,
          width: '100%',
          backgroundColor: colours.white,
          borderRadius: borderRadius.large,
          marginTop: 20,
          overflow: 'hidden',
        }}
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
        {selectedImage && (
          <Text
            style={{
              position: 'absolute',
              end: 0,
              bottom: 0,
              padding: 5,
              margin: 10,
              ...textStyles.body,
              borderStyle: 'dotted',
              borderRadius: borderRadius.medium,
              borderWidth: 3,
              borderColor: colours.whiteAlpha,
            }}
            onPress={() => setShowImagePicker(true)}
          >
            Choose Image
          </Text>
        )}
      </View>

      <Button_
        showLoading={fileUpload.isLoading || updateProfileApi.isLoading}
        title={selectedImage ? 'Upload' : 'Select image'}
        containerStyle={{
          marginTop: 80,
        }}
        onPress={() => {
          if (!selectedImage) {
            setShowImagePicker(true);
          } else {
            uploadImage();
          }
        }}
      />
      <ImagePickerDialog_
        onCancel={() => setShowImagePicker(false)}
        visible={showImagePicker}
        onImage={(uri) => {
          setSelectedImageURI(uri);
          setShowImagePicker(false);
        }}
      />
    </ContainerView>
  );
};

export default DriversLicenseScreen;
