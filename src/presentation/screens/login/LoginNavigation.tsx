import NavigationConfig from '@navigation/NavigationConfig';
import { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import DriversLicenseScreen from './DriversLicenseScreen';
import EmailScreen from './EmailScreen';
import LocationSettingsScreen from './LocationSettingsScreen';
import OTPScreen from './OTPScreen';
import ProfileDetailsScreen from './ProfileDetailsScreen';
import VehicleImagesScreen from './VehicleImagesScreen';
import VehicleTypeSceen from './VehicleTypeSceen';

type LoginScreenList = {
  [NavigationConfig.EmailScreen]: undefined;
  [NavigationConfig.OTPScreen]: undefined;
  [NavigationConfig.ProfileDetailsScreen]: {
    token: string;
  };
  [NavigationConfig.VehicleTypeSceen]: undefined;
  [NavigationConfig.LocationSettingsScreen]: undefined;
  [NavigationConfig.DriversLicenseScreen]: undefined;
  [NavigationConfig.VehicleImagesScreen]: undefined;
};

export type LoginStackScreenProps<T extends keyof LoginScreenList> = {
  navigation?: NativeStackNavigationProp<LoginScreenList, T>;
  route?: RouteProp<LoginScreenList, T>;
};

const LoginStack = createNativeStackNavigator<LoginScreenList>();

const LoginNavigation: React.FC = () => {
  return (
    <LoginStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <LoginStack.Screen
        name={NavigationConfig.EmailScreen}
        component={EmailScreen}
      />
      <LoginStack.Screen
        name={NavigationConfig.OTPScreen}
        component={OTPScreen}
      />

      <LoginStack.Screen
        name={NavigationConfig.ProfileDetailsScreen}
        component={ProfileDetailsScreen}
      />

      <LoginStack.Screen
        name={NavigationConfig.VehicleTypeSceen}
        component={VehicleTypeSceen}
      />

      <LoginStack.Screen
        name={NavigationConfig.LocationSettingsScreen}
        component={LocationSettingsScreen}
      />

      <LoginStack.Screen
        name={NavigationConfig.DriversLicenseScreen}
        component={DriversLicenseScreen}
      />

      <LoginStack.Screen
        name={NavigationConfig.VehicleImagesScreen}
        component={VehicleImagesScreen}
      />
    </LoginStack.Navigator>
  );
};

export default LoginNavigation;
