import NetInfo from '@react-native-community/netinfo';

export const isOffline = async () => {
  const state = await NetInfo.fetch();
  return !state.isConnected || !state.isInternetReachable;
};
