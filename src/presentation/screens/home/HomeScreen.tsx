import ContainerView from '@components/ContainerView';
import { useTextStyles } from '@hooks/styles/textStyles';
import useAppUtils from '@hooks/utils/useAppUtils';
import { Text } from '@rneui/themed';
import { requestLocationPermissions } from '@utils/locationUtils';
import React, { useEffect } from 'react';
import { HomeStackScreenProps } from './HomeNavigation';
import useUserStateStore from '@state/useUserStateStore';
import VehicleImagesScreen from '@screens/login/VehicleImagesScreen';
import LocationSettingsScreen from '@screens/login/LocationSettingsScreen';

const HomeScreen: React.FC<HomeStackScreenProps<'homeScreen'>> = () => {
  // const [status, requestPermission] = Location.useBackgroundPermissions();

  // console.log('Permission Staus :: ', status);

  const { logout } = useAppUtils();
  const textStyles = useTextStyles();
  const { email, setToken ,token } = useUserStateStore();

  useEffect(() => {
    (async () => {
      await requestLocationPermissions();
    })();
  }, []);

  return (
    <ContainerView>
      <Text style={textStyles.body}>Home</Text>
      <Text
        h4
        onPress={() => logout()}
      >
        logout
      </Text>
      {/* <LocationSettingsScreen /> */}
    </ContainerView>
  );
};

export default HomeScreen;
