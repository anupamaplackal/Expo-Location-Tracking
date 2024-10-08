import theme from "@common/theme";
import StatusBarBackground from "@components/StatusBarBackground";
import useLoadFonts from "@hooks/utils/useLoadFonts";
import ModuleNavigation from "@navigation/ModuleNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "@rneui/themed";
import useAppStateStore from "@state/useAppStateStore";
import useUserStateStore from "@state/useUserStateStore";
import { useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

export default function App() {
  const { token,auth } = useUserStateStore();
  const { setAppState } = useAppStateStore();
  const fontsLoaded = useLoadFonts();


  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
      
      // Check token and set app state accordingly
      setAppState(auth ? 'home' : 'login');
    }
  }, [fontsLoaded, token]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <StatusBarBackground />
          <ModuleNavigation />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
