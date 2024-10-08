import { create } from 'zustand';

type AppStateType = 'splash' | 'login' | 'home';

interface AppState {
  appState: AppStateType;
  setAppState: (state: AppStateType) => void;
}

const useAppStateStore = create<AppState>()((set) => ({
  appState: 'login',
  setAppState: (newState) => set((state) => ({ appState: newState })),
}));

export default useAppStateStore;
