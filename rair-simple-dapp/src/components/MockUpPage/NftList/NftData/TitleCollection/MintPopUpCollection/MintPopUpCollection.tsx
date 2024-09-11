import React from 'react';

import { MintPopUpCollectionContainer } from './StyledMintPopUpCollection';

import CollectionInfo from '../../CollectionInfo/CollectionInfo';

interface IMintPopUpCollection {
  blockchain: any;
  offerDataCol: any;
  primaryColor: any;
  contractAddress: any;
  setPurchaseStatus: any;
  closeModal?: any;
  mainBannerInfo?: any;
}

const MintPopUpCollection: React.FC<IMintPopUpCollection> = ({
  blockchain,
  offerDataCol,
  primaryColor,
  contractAddress,
  setPurchaseStatus,
  closeModal,
  mainBannerInfo
}) => {
  return (
    <MintPopUpCollectionContainer primaryColor={primaryColor}>
      <CollectionInfo
        closeModal={closeModal}
        blockchain={blockchain}
        offerData={offerDataCol}
        openTitle={false}
        mintToken={true}
        mainBannerInfo={mainBannerInfo}
        contractAddress={contractAddress}
        setPurchaseStatus={setPurchaseStatus}
      />
    </MintPopUpCollectionContainer>
  );
};

export default MintPopUpCollection;
