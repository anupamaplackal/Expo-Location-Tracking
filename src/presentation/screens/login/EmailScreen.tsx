import React, { useEffect, useState } from 'react';
import Animated from 'react-native-reanimated';

import NavigationConfig from '@navigation/NavigationConfig';
import useAppStateStore from '@state/useAppStateStore';
import useUserStateStore from '@state/useUserStateStore';
import useUserApi from '@hooks/services/useUserApi';
import Button_ from '@components/Button_';
import ContainerView from '@components/ContainerView';
import Input_ from '@components/Input_';
import { useTextStyles } from '@hooks/styles/textStyles';
import { isValidEmail } from '@utils/useValidationUtils';
import { LoginStackScreenProps } from './LoginNavigation';

const EmailScreen: React.FC<LoginStackScreenProps<'emailScreen'>> = ({
  navigation,
}) => {
  const textStyles = useTextStyles();
  const { setEmail } = useUserStateStore();
  const [userEmail, setUserEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const { verifyEmailApi } = useUserApi();
  const { setAppState } = useAppStateStore();

  useEffect(() => {
    if (verifyEmailApi.response) {
      setEmail(userEmail);
      navigation?.push(NavigationConfig.OTPScreen);  
    }
  }, [verifyEmailApi.response]);

  const verify = () => {
    if (!isValidEmail(userEmail)) {
      setEmailError(true);
    } else {
      setEmailError(false);
      verifyEmailApi.execute({ email: userEmail });
    }
  };

  return (
    <ContainerView containerStyle={{ justifyContent: 'center' }}>
      <Animated.Text style={{ ...textStyles.h2, marginBottom: 20 }}>
        Enter your email to receive an OTP
      </Animated.Text>

      <Input_
        value={userEmail}
        onChangeText={setUserEmail}
        placeholder='Email Id'
        keyboardType='email-address'
        showError={emailError}
        errorMessage='Enter valid email'
      />

      <Button_
        title='Verify'
        onPress={verify}
        showLoading={verifyEmailApi.isLoading}
        containerStyle={{ marginTop: 20 }}
      />
    </ContainerView>
  );
};


export default EmailScreen;
