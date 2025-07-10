![Banner](https://github.com/rairprotocol/rair-dapp/blob/main/rair-infra/assets/img/banner.webp)
[![RAIRmarket](https://img.shields.io/badge/RAIR-market-C67FD1)](https://rair.market)
[![RAIRprotocol](https://img.shields.io/badge/RAIR-protocol-C67FD1)](https://rairprotocol.org)
![License](https://img.shields.io/badge/License-Apache2.0-yellow)
[![Discord](https://img.shields.io/badge/Discord-4950AF)](https://discord.gg/vuBUfB7w)
[![Twitter](https://img.shields.io/twitter/follow/rairprotocol)](https://twitter.com/rairprotocol)

Clone this repository on your own GitHub account and deploy it to Netlify:

[![Netlify Deploy button](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/rairprotocol/rair-official-library/tree/main/coin-game)


# rair-templates
Official repository for first-party simple distributed application templates new users can deploy

## how it works

The rair-dapp mono-repo contains our open-source default front, back, syncing, and streaming engines. This repo contains several frontend folders each designed to showcase a different use case functionality.

## how to use

Step -1 : Clone and fork this repo. Please submit new dApps as an independent repo by checking in your unique frontend code, or if you have also modified source code elsewhere in the mono-repo.

Step -2 : Copy ![.env.sample](https://github.com/rairprotocol/rair-dapp/blob/main/.env.sample) from rair-dapp repository to your root of Installation directory

Step -3 : copy .env.sample to .env

Step -4 : copy .env.sample to .env in the new dApp which you want to deploy e.g., dev-dapp

Step -5 : Build Docker images using command


sudo TEMPLATE={Folder name of dApp} docker-compose -f docker-compose-templates.yml up -d


For example, for building Docker image of dev-dapp, command to be used is


sudo TEMPLATE=dev-dapp docker-compose -f docker-compose-templates.yml up -d

Step -6 : Launch the Application by pointing Browser to http://localhost:8088


# frontend examples

**Example Folder**|**About**|**Use cases**
:-----:|:-----:|:-----:
rair-simple-dapp|Simplest hello world dApp to deploy with RAIRprotocol. Contains default syncing, AA, backend, logic|Ticketing, events, signup, interest forms mint NFT
rair-metadata|Creates unique identifiers (NFTs) imbues with metadata (JSON). Point to public or private data repositories. Cloud, IPFS, etc.|Medical records, IOT devices, Supply chain items 
rair-unlock|Gates access to Zoom via Zoom API. Debit tokens upon sucessful session|Therapy, Coding Help, Auto Mechanic, any use case to connect users with valuable live knowledge in exchange for tokens
rair-age-estimation|Triggers Yoti age estimation flow. On success submits age boolean to database that can be written onchain via soulbound NFT.|KYC, Adult, other Identity Application
rair-thirdweb-cat-attack|Demo of Thirdweb loading inside of RAIRprotocol. **Caution this requires https:// and 16gb ram VM to run properly, all native RAIRprotocol deployments only require 8gb ram**|dApps using thirdweb specific functionality. RPC. Wallets etc instead of native solutions (Alchemy, et al)
