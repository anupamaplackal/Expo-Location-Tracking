// useUserStateStore.ts
import { UserProfile } from '@hooks/services/types/user/update/UpdateProfileResponse';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserState {
  token: string;
  setToken: (token: string) => void;
  auth: boolean;
  setAuth: (auth: boolean) =>void
  email: string;
  setEmail: (email: string) => void;
  user: UserProfile | undefined;
  setUser: (user: UserProfile) => void;
  clearUserState: () => void; // New method to clear user state
}

const useUserStateStore = create(
  persist<UserState>(
    (set) => ({
      token: '',
      setToken: (token: string) => set({ token }),
      auth: false,
      setAuth: (auth: boolean) => set({ auth }),
      email: '',
      setEmail: (email: string) => set({ email }),
      user: undefined,
      setUser: (user: UserProfile) => set({ user }),
      clearUserState: async () => {
        // Clear the AsyncStorage
        await AsyncStorage.removeItem('user-storage'); // or the name you used
        set({ token: '', email: '', user: undefined }); // Clear in-memory state
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useUserStateStore;
