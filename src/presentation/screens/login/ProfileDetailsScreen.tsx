import colours from '@common/colours';
import { appDateFormat, borderRadius } from '@common/constants';
import Button_ from '@components/Button_';
import ContainerView from '@components/ContainerView';
import Input_ from '@components/Input_';
import { CreateProfileRequest } from '@hooks/services/types/user/create/CreateProfileRequest';
import { UserProfile } from '@hooks/services/types/user/update/UpdateProfileResponse';
import useUserApi from '@hooks/services/useUserApi';
import { useTextStyles } from '@hooks/styles/textStyles';
import NavigationConfig from '@navigation/NavigationConfig';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import useUserStateStore from '@state/useUserStateStore';
import { isValidMobile } from '@utils/useValidationUtils';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { LoginStackScreenProps } from './LoginNavigation';

interface ErrorProps {
  first_name: boolean;
  last_name: boolean;
  dob: boolean;
  mobile: boolean;
  pin_code: boolean;
}

const defaultErrorProps: ErrorProps = {
  first_name: false,
  last_name: false,
  dob: false,
  mobile: false,
  pin_code: false,
};

const ProfileDetailsScreen: React.FC<
  LoginStackScreenProps<'profileDetailsScreen'>
> = ({ navigation, route }) => {
  const textStyles = useTextStyles();
  const { setToken, setUser } = useUserStateStore();
  const { createProfileApi } = useUserApi();
  const [profileData, setProfileData] = useState<CreateProfileRequest>();
  const [errors, setErrors] = useState<ErrorProps>(defaultErrorProps);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [date, setDate] = useState<Date>();
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  useEffect(() => {
    if (createProfileApi.response) {
      setToken(route?.params.token ?? '');
      setUser(createProfileApi.response as UserProfile);
      navigation?.push(NavigationConfig.VehicleTypeSceen);
    }
  }, [createProfileApi.response]);

  const verified = () => {
    if (!profileData?.first_name || profileData?.first_name.length < 3) {
      setErrors({ ...defaultErrorProps, first_name: true });
      setErrorMessage('First Name Missing');
      return false;
    } else if (!profileData?.last_name || profileData.last_name.length < 3) {
      setErrors({ ...defaultErrorProps, last_name: true });
      setErrorMessage('Last Name Missing');
      return false;
    } else if (!date) {
      setErrors({ ...defaultErrorProps, dob: true });
      setErrorMessage('Select Date Of Birth');
      return false;
    } else if (!isValidMobile(profileData?.phone)) {
      setErrors({ ...defaultErrorProps, mobile: true });
      setErrorMessage('Mobile');
      return false;
    } else if (!profileData?.pin_code || profileData.pin_code.length < 6) {
      setErrors({ ...defaultErrorProps, pin_code: true });
      setErrorMessage('Pin Code');
      return false;
    }
    setErrors(defaultErrorProps);
    return true;
  };

  const createAccount = () => {
    if (verified()) {
      createProfileApi.execute({
        ...profileData,
        dob: moment(date).format(appDateFormat),
      });
    }
  };

  const toggleCalendar = () => {
    setShowDatePicker(!showDatePicker);
  };

  return (
    <ContainerView
      containerStyle={{ justifyContent: 'center' }}
      message={errorMessage}
      showMessage={errorMessage.length > 0}
      showMessageCallback={() => setErrorMessage('')}
    >
      <Animated.Text
        style={{
          position: 'absolute',
          top: 10,
          start: 10,
        }}
        onPress={() => navigation?.goBack()}
      >
        Back
      </Animated.Text>
      <Animated.Text
        layout={LinearTransition}
        style={{ ...textStyles.h2, marginBottom: 20 }}
      >
        Enter your profile details
      </Animated.Text>
      <Input_
        placeholder='First Name'
        value={profileData?.first_name}
        onChangeText={(text: string) =>
          setProfileData({ ...profileData, first_name: text })
        }
        containerStyle={{
          marginBottom: 10,
        }}
        showError={errors.first_name}
        errorMessage={'Enter Valid Name'}
      />
      <Input_
        placeholder='Last Name'
        value={profileData?.last_name}
        onChangeText={(text: string) =>
          setProfileData({ ...profileData, last_name: text })
        }
        containerStyle={{
          marginBottom: 10,
        }}
        showError={errors.last_name}
        errorMessage={'Enter Valid Name'}
      />

      <Animated.Text
        layout={LinearTransition}
        style={{
          ...textStyles.input,
          marginBottom: 10,
          paddingHorizontal: 15,
          paddingVertical: 10,
          backgroundColor: colours.white,
          borderRadius: borderRadius.medium,
          overflow: 'hidden',
          color: date ? 'gray' : colours.blackAlpha1,
        }}
        onPress={toggleCalendar}
      >
        {date ? moment(date).format(appDateFormat) : appDateFormat}
      </Animated.Text>
      {showDatePicker && (
        <RNDateTimePicker
          mode='date'
          maximumDate={new Date()}
          value={date || new Date()}
          onChange={(e, date) => {
            setShowDatePicker(false);
            setDate(date);
          }}
        />
      )}

      <Input_
        placeholder='Mobile Number'
        keyboardType='phone-pad'
        value={profileData?.phone}
        onChangeText={(text: string) =>
          setProfileData({ ...profileData, phone: text })
        }
        containerStyle={{
          marginBottom: 10,
        }}
        showError={errors.mobile}
        errorMessage={'Enter Valid Mobile Number'}
      />
      <Input_
        placeholder='Postal Code'
        keyboardType='number-pad'
        value={profileData?.pin_code}
        onChangeText={(text: string) =>
          setProfileData({ ...profileData, pin_code: text })
        }
        containerStyle={{
          marginBottom: 20,
        }}
        showError={errors.pin_code}
        errorMessage={'Enter Valid Pin'}
      />

      <Button_
        title='Next'
        onPress={createAccount}
      />
    </ContainerView>
  );
};

export default ProfileDetailsScreen;
