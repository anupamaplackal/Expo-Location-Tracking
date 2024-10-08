import * as Location from 'expo-location';

export const requestLocationPermissions = async () => {
  try {
    const { status: foregroundStatus } =
      await Location.requestForegroundPermissionsAsync();
    if (foregroundStatus !== 'granted') {
      console.log('Foreground location permission denied');
      return;
    }
    console.log('Foreground location permission granted');

    const { status: backgroundStatus } =
      await Location.requestBackgroundPermissionsAsync();
    if (backgroundStatus !== 'granted') {
      console.log('Background location permission denied');
      return;
    }
    console.log('Background location permission granted');

    // Both permissions granted, you can use location services here
  } catch (error) {
    console.error('Error requesting location permissions', error);
  }
};
