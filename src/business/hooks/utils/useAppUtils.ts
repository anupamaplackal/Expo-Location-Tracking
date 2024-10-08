import useApiService from '@hooks/api/useApiService';
import useAppStateStore from '@state/useAppStateStore';
import useUserStateStore from '@state/useUserStateStore';
import Constants from 'expo-constants';
import { useEffect } from 'react';

const useAppUtils = () => {
  const { setToken, clearUserState,token, setUser, setEmail, } = useUserStateStore(); // Use clearUserState
  const { setAppState } = useAppStateStore();
  const { setAccessToken } = useApiService();

  useEffect(() => {
    if (!token) {
        setAppState('login'); // This should ensure no navigation happens if token is null
    }
  }, [token]);
  
  
  const getAppVersion = () => {
    return Constants.expoConfig?.version || '';
  };

  const logout = () => {
    clearUserState(); 
    setAccessToken('');
    setToken('');
    setEmail('')
    setAppState('login');
  };

  return { getAppVersion, logout };
};


export default useAppUtils;
