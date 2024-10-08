// src/hooks/useLoadFonts.js
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

export const Fonts = {
  LexendBlack: 'LexendBlack',
  LexendRegular: 'LexendRegular',
  LexendThin: 'LexendThin',
};

const useLoadFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        LexendBlack: require('assets/fonts/Lexend-Black.ttf'),
        LexendRegular: require('assets/fonts/Lexend-Regular.ttf'),
        LexendThin: require('assets/fonts/Lexend-Thin.ttf'),
      });
      setFontsLoaded(true);
    } catch (error) {
      console.error('Error loading fonts:', error);
    }
  };

  useEffect(() => {
    loadFonts();
  }, []);

  return fontsLoaded;
};

export default useLoadFonts;
