# rair-templates
Simple dApps new users can deploy

# how it works

The rair-dapp mono-repo contains our open-source default front, back, syncing, and streaming engines. This repo contains several frontend folders each designed to showcase a different use case functionality.

# how to use

Clone and fork this repo. Please submit new dApps as an independent repo by checking in your unique frontend code, or if you have also modified source code elsewhere in the mono-repo. 

# frontend examples

**Example Folder**|**About**|**Use cases**
:-----:|:-----:|:-----:
rair-simple-dapp|Simplest hello world dApp to deploy with RAIRprotocol. Contains default syncing, AA, backend, logic|Ticketing, events, signup, interest forms mint NFT
rair-metadata|Creates unique identifiers (NFTs) imbues with metadata (JSON). Point to public or private data repositories. Cloud, IPFS, etc.| 
rair-unlock|Gates access to Zoom via Zoom API. Debit tokens upon sucessful session|Therapy, Coding Help, Auto Mechanic, any use case to connect users with valuable live knowledge in exchange for tokens
rair-age-estimation|Triggers Yoti age estimation flow. On success submits age boolean to database that can be written onchain via soulbound NFT.|KYC, Adult, other Identity Application
rair-thirdweb-cat-attack|Demo of Thirdweb loading inside of RAIRprotocol|dApps using thirdweb specific functionality. RPC. Wallets etc instead of native solutions (Alchemy, et al)
