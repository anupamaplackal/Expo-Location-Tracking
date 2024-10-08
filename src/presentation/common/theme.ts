import { Fonts } from '@hooks/utils/useLoadFonts';
import { createTheme } from '@rneui/themed';
import colours, { darkColors, lightColors } from './colours';
import { borderRadius } from './constants';

const theme = createTheme({
  lightColors: {
    primary: lightColors.primary,
  },
  darkColors: {
    primary: darkColors.primary,
  },
  mode: 'dark',
  components: {
    Text: {
      style: {
        fontFamily: Fonts.LexendRegular,
        color: colours.white,
      },
    },
    Input: {
      renderErrorMessage: false,
      containerStyle: {
        backgroundColor: colours.white,
        borderRadius: borderRadius.medium,
      },
      inputContainerStyle: {
        borderBottomWidth: 0,
        paddingHorizontal: 5,
      },
      inputStyle: {
        fontFamily: Fonts.LexendRegular,
        color: colours.textColor,
      },
      placeholderTextColor: colours.blackAlpha1,
    },
  },
});

export default theme;
