import images from '@assets/images/images';
import Button_ from '@components/Button_';
import ContainerView from '@components/ContainerView';
import Dialog_ from '@components/Dialog_';
import { useTextStyles } from '@hooks/styles/textStyles';
import NavigationConfig from '@navigation/NavigationConfig';
import { Text } from '@rneui/themed';
import * as Location from 'expo-location';
import React, { useState } from 'react';
import { Image, Linking } from 'react-native';
import { LoginStackScreenProps } from './LoginNavigation';

const LocationSettingsScreen: React.FC<
  LoginStackScreenProps<'locationSettings'>
> = ({ navigation }) => {
  const textStyles = useTextStyles();
  const [showPermissionDialog, setShowPermissionDialog] =
    useState<boolean>(false);

  const requestForegroundPermissions = async () => {
    let {
      status: foregroundLocationPermission,
    }: Location.LocationPermissionResponse =
      await Location.requestForegroundPermissionsAsync();
    if (foregroundLocationPermission !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    } else {
      let location = await Location.getCurrentPositionAsync({});
      console.info('Location :: ', location);
      setShowPermissionDialog(true);
    }
  };

  const requestBackgroundPermission = async () => {
    let {
      status: backgroundLocationPermission,
    }: Location.LocationPermissionResponse =
      await Location.requestBackgroundPermissionsAsync();
    if (backgroundLocationPermission !== 'granted') {
      Linking.openSettings();
    } else {
      navigation?.replace(NavigationConfig.DriversLicenseScreen);
    }
    console.log('backgroundLocationPermission', backgroundLocationPermission);
  };

  return (
    <ContainerView
      containerStyle={{
        justifyContent: 'center',
      }}
    >
      <Text
        style={{ ...textStyles.h2, marginBottom: 20, paddingHorizontal: 10 }}
      >
        {`Please set Location settings as\n"Always Allowed"`}
      </Text>

      <Button_
        title='Request Permissions'
        onPress={requestForegroundPermissions}
        containerStyle={{
          marginTop: 20,
        }}
      />
      <Dialog_
        visible={showPermissionDialog}
        message='Allow location permission as "Allow all the time" on next screen'
        title='Background Location Permission required'
        buttonsList={[
          {
            text: 'OK',
            onPress: () => {
              setShowPermissionDialog(false);
              requestBackgroundPermission();
            },
          },
          {
            text: 'Cancel',
            onPress: () => {
              setShowPermissionDialog(false);
            },
          },
        ]}
      />
    </ContainerView>
  );
};

export default LocationSettingsScreen;
