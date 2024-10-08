import { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import NavigationConfig from '../../navigation/NavigationConfig';
import HomeScreen from './HomeScreen';

type HomeStackScreensList = {
  [NavigationConfig.HomeScreen]: undefined;
};

export type HomeStackScreenProps<T extends keyof HomeStackScreensList> = {
  navigation?: NativeStackNavigationProp<HomeStackScreensList, T>;
  route?: RouteProp<HomeStackScreensList, T>;
};

const HomeStack = createNativeStackNavigator<HomeStackScreensList>();

const HomeNavigation: React.FC = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen
        name={NavigationConfig.HomeScreen}
        component={HomeScreen}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigation;
