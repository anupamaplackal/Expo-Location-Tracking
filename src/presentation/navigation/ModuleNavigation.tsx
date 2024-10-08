import HomeNavigation from '@screens/home/HomeNavigation';
import LoginNavigation from '@screens/login/LoginNavigation';
import useAppStateStore from '@state/useAppStateStore';
import useUserStateStore from '@state/useUserStateStore';
import React, { useEffect } from 'react';

const ModuleNavigation: React.FC = () => {
  const { appState } = useAppStateStore();

  switch (appState) {
    case 'login':
      return <LoginNavigation />;
    case 'home':
      return <HomeNavigation />;
  }
};

export default ModuleNavigation;
