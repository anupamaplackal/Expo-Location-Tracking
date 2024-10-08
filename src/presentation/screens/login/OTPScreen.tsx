import React, { useEffect, useState } from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import useAppStateStore from '@state/useAppStateStore';
import useUserStateStore from '@state/useUserStateStore';
import colours from '@common/colours';
import Button_ from '@components/Button_';
import ContainerView from '@components/ContainerView';
import OTPInput from '@components/OTPInput';
import useApiService from '@hooks/api/useApiService';
import useUserApi from '@hooks/services/useUserApi';
import { useTextStyles } from '@hooks/styles/textStyles';
import NavigationConfig from '@navigation/NavigationConfig';
import { Text } from '@rneui/themed';
import { LoginStackScreenProps } from './LoginNavigation';

const OTPScreen: React.FC<LoginStackScreenProps<'otpScreen'>> = ({
  navigation,
}) => {
  const { email, setToken, setAuth } = useUserStateStore();
  const { setAccessToken } = useApiService();
  const { setAppState } = useAppStateStore();
  const [otp, setOTP] = useState<string>('');
  const { verifyOTPApi } = useUserApi();
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    if (verifyOTPApi.response) {
      const authToken = verifyOTPApi.response.auth_token;
      if (authToken) {
        setToken(authToken);  
        setAccessToken(authToken);  
        if (verifyOTPApi.response.is_created) {
          console.log('Navigating to Home');
          setAuth(true);
          setAppState('home');
        } else {
          console.log('Navigating to ProfileDetailsScreen');
          navigation?.push(NavigationConfig.ProfileDetailsScreen, { token: authToken });
        }
      }
    }
  }, [verifyOTPApi.response]);

  const signIn = () => {
    setShowError(false);
    verifyOTPApi.execute({ otp, email });
  };

  return (
    <ContainerView
      containerStyle={{ justifyContent: 'center' }}
      message={showError ? 'Something went wrong' : ''}
    >
      <Animated.Text style={{ marginBottom: 20 }}>
        Enter the OTP sent to your email
      </Animated.Text>

      <OTPInput
        length={5}
        onChangeOTP={setOTP}
      />

      {showError && (
        <Animated.Text style={{ color: 'red', textAlign: 'center' }}>
          Something went wrong
        </Animated.Text>
      )}

      <Button_
        title='Next'
        onPress={signIn}
        showLoading={verifyOTPApi.isLoading}
        containerStyle={{ marginTop: 20 }}
      />
    </ContainerView>
  );
};


export default OTPScreen;
