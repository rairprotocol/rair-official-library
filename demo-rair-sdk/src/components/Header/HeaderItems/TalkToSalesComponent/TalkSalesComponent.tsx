import React from 'react';
import { useStore } from 'react-redux';

import { TalkSalesButton } from './TalkSalesButton';

import { useAppSelector } from '../../../../hooks/useReduxHooks';
import useSwal from '../../../../hooks/useSwal';

interface ITalkSalesComponent {
  classes?: string;
  text: string;
  isAboutPage?: boolean;
}

const TalkSalesComponent: React.FC<ITalkSalesComponent> = ({
  classes,
  text,
  isAboutPage
}) => {
  const { primaryColor } = useAppSelector((store) => store.colors);

  const { adminRights } = useAppSelector((store) => store.user);

  const { currentUserAddress } = useAppSelector((store) => store.web3);

  const reactSwal = useSwal();

  const store = useStore();

  return (
    <TalkSalesButton
      isAboutPage={isAboutPage}
      adminPanel={adminRights}
      primaryColor={primaryColor}
      className={classes ? classes : ''}
      currentUserAddress={currentUserAddress}
      onClick={() => null }>
      {text}
    </TalkSalesButton>
  );
};

export default TalkSalesComponent;
