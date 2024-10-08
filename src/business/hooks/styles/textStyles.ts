import { Fonts } from '@hooks/utils/useLoadFonts';
import { useTheme } from '@rneui/themed';
import { StyleSheet } from 'react-native';

export const useTextStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    h1: {
      fontSize: 32,
      fontFamily: Fonts.LexendBlack,
      color: theme.colors.black,
    },
    h2: {
      fontSize: 28,
      fontFamily: Fonts.LexendBlack,
      color: theme.colors.black,
    },
    h3: {
      fontSize: 24,
      fontFamily: Fonts.LexendBlack,
      color: theme.colors.black,
    },
    h4: {
      fontSize: 20,
      fontFamily: Fonts.LexendBlack,
      color: theme.colors.black,
    },
    h5: {
      fontSize: 18,
      fontFamily: Fonts.LexendBlack,
      color: theme.colors.black,
    },
    h6: {
      fontSize: 16,
      fontFamily: Fonts.LexendBlack,
      color: theme.colors.black,
    },
    body: {
      fontSize: 16,
      fontFamily: Fonts.LexendRegular,
      color: theme.colors.black,
    },
    subtitle1: {
      fontSize: 14,
      fontFamily: Fonts.LexendRegular,
      color: theme.colors.grey1,
    },
    subtitle2: {
      fontSize: 12,
      fontFamily: Fonts.LexendRegular,
      color: theme.colors.grey1,
    },
    caption: {
      fontSize: 12,
      fontFamily: Fonts.LexendRegular,
      color: theme.colors.grey0,
    },
    overline: {
      fontSize: 10,
      fontFamily: Fonts.LexendThin,
      color: theme.colors.grey1,
      textTransform: 'uppercase',
    },
    button: {
      fontSize: 14,
      fontFamily: Fonts.LexendRegular,
      color: theme.colors.white,
    },
    input: {
      fontSize: 16,
      fontFamily: Fonts.LexendRegular,
      color: theme.colors.black,
    },
  });
};
