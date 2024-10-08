import colours from '@common/colours';
import { vehicleTypes } from '@common/constants';
import Button_ from '@components/Button_';
import ContainerView from '@components/ContainerView';
import DropDownComponent_ from '@components/DropDownComponent_';
import useUserApi from '@hooks/services/useUserApi';
import { useTextStyles } from '@hooks/styles/textStyles';
import NavigationConfig from '@navigation/NavigationConfig';
import { Text } from '@rneui/themed';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { LoginStackScreenProps } from './LoginNavigation';

const VehicleTypeSceen: React.FC<LoginStackScreenProps<'vehicleTypeSceen'>> = ({
  navigation,
}) => {
  const textStyles = useTextStyles();
  const { updateProfileApi } = useUserApi();
  const [vehicle, setVehicle] = useState<any>();

  useEffect(() => {
    if (updateProfileApi.response) {
      checkPermissionAndNavigate();
      navigation?.navigate(NavigationConfig.LocationSettingsScreen);
    }
    if (updateProfileApi.error) {
    }
  }, [updateProfileApi.response, updateProfileApi.error]);

  const selectVehicle = () => {
    if (!vehicle) {
      Alert.alert('Not Selected');
    } else {
      console.log(vehicle);
      updateVehicle();
    }
  };

  const updateVehicle = () => {
    updateProfileApi.execute({
      vehicle_type: vehicle,
    });
  };

  const checkPermissionAndNavigate = async () => {
    const { status } = await Location.getBackgroundPermissionsAsync();
    if (status !== 'granted') {
      navigation?.push(NavigationConfig.LocationSettingsScreen);
    } else {
      navigation?.push(NavigationConfig.DriversLicenseScreen);
    }
  };

  const onSkip = () => {
    checkPermissionAndNavigate();
  };

  return (
    <ContainerView
      containerStyle={{
        justifyContent: 'center',
      }}
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
      <Animated.Text
        layout={LinearTransition}
        style={{ ...textStyles.h2, marginBottom: 20 }}
      >
        Select the Vehicle you own
      </Animated.Text>

      <DropDownComponent_
        placeholder={'Select Vehicle'}
        value={vehicle}
        onValueChange={setVehicle}
        data={vehicleTypes}
      />

      <Button_
        title='Next'
        onPress={selectVehicle}
        showLoading={updateProfileApi.isLoading}
        containerStyle={{
          marginTop: 20,
        }}
      />

      <Text
        style={{
          ...textStyles.button,
          color: colours.white,
          marginTop: 80,
          textAlign: 'center',
        }}
        onPress={onSkip}
      >
        Skip
      </Text>
    </ContainerView>
  );
};

export default VehicleTypeSceen;
