export const getBaseURL = (): string => {
  return __DEV__ ? 'https://api.oohmetrics.co' : 'https://valorant-api.com/v1';
};
