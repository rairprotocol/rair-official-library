import { useCallback, useEffect } from 'react';
import { Hex } from 'viem';

import { useAppDispatch, useAppSelector } from './useReduxHooks';
import useSwal from './useSwal';

import { rairSDK } from '../components/common/rairSDK';
import { RairFavicon } from '../images';
import { loadSettings } from '../redux/settingsSlice';
import chainData from '../utils/blockchainData';

const useServerSettings = () => {
  const dispatch = useAppDispatch();

  const reactSwal = useSwal();

  const { blockchainSettings, favicon, customValues } = useAppSelector(
    (store) => store.settings
  );

  const getBlockchainData = useCallback(
    (chainId?: Hex) => {
      if (!chainId) {
        return;
      }
      return {
        ...chainData[chainId],
        ...blockchainSettings.find((chain) => chain.hash === chainId)
      };
    },
    [blockchainSettings]
  );

  useEffect(() => {
    const link: HTMLLinkElement =
      document.querySelector("link[rel*='icon']") ||
      document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'icon';
    link.href = favicon ? favicon : RairFavicon;
    document.getElementsByTagName('head')[0].appendChild(link);

    return () => {
      if (link?.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, [favicon]);

  const getCustomValue = useCallback(
    (key) => {
      if (!key) {
        return;
      }
      const data = customValues?.find((item) => item.name === key);
      return data?.value;
    },
    [customValues]
  );

  const updateServerSetting = useCallback(
    async (setting) => {
      const response = await rairSDK.settings?.setSetting(setting);
      if (response?.success) {
        dispatch(loadSettings());
        reactSwal.fire('Success', 'Setting updated', 'success');
      }
    },
    [dispatch, reactSwal]
  );

  return {
    updateServerSetting,
    getBlockchainData,
    getCustomValue
  };
};

export default useServerSettings;
