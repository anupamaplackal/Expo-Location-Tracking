import useApiCall from '@hooks/api/useApiCall';
import useApiService from '@hooks/api/useApiService';
import useAppUtils from '@hooks/utils/useAppUtils';
import { LoginRequest } from './types/onboard/login/LoginRequest';
import { LoginResponse } from './types/onboard/login/LoginResponse';
import VerifyOtpRequest from './types/onboard/login/otp/VerifyOtpRequest';
import VerifyOtpResponse from './types/onboard/login/otp/VerifyOtpResponse';
import { CreateProfileRequest } from './types/user/create/CreateProfileRequest';
import { CreateProfileResponse } from './types/user/create/CreateProfileResponse';
import { UpdateProfileResponse } from './types/user/update/UpdateProfileResponse';

const useUserApi = () => {
  const { post, put } = useApiService();
  const { getAppVersion } = useAppUtils();

  const verifyEmail = async (data?: LoginRequest) => {
    return post<LoginResponse>('/user/verifyEmail', data);
  };

  const verifyOTP = async (data?: VerifyOtpRequest) => {
    return post<VerifyOtpResponse>('/user/verifyOTP', data);
  };

  const createProfile = async (data?: CreateProfileRequest) => {
    return post<CreateProfileResponse>('/user/signup', {
      ...data,
      app_version: getAppVersion(),
    });
  };
  const updateProfile = async (data?: CreateProfileRequest) => {
    return put<UpdateProfileResponse>('/user/profile', {
      ...data,
      app_version: getAppVersion(),
    });
  };
  return {
    verifyEmailApi: useApiCall<LoginResponse, LoginRequest>(async (params) =>
      verifyEmail(params)
    ),
    verifyOTPApi: useApiCall<VerifyOtpResponse, VerifyOtpRequest>(
      async (params) => verifyOTP(params)
    ),
    createProfileApi: useApiCall<CreateProfileResponse, CreateProfileRequest>(
      async (params) => createProfile(params)
    ),
    updateProfileApi: useApiCall<UpdateProfileResponse, CreateProfileRequest>(
      async (params) => updateProfile(params)
    ),
  };
};

export default useUserApi;
