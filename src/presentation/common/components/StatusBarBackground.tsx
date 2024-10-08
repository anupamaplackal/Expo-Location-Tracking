import colours from '@common/colours';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const StatusBarBackground: React.FC = () => {
  const insets = useSafeAreaInsets();

  return <View style={[styles.statusBarBackground, { height: insets.top }]} />;
};

const styles = StyleSheet.create({
  statusBarBackground: {
    backgroundColor: colours.transparent,
  },
});

export default StatusBarBackground;
