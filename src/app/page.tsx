"use client";
import { LensProvider } from '@lens-protocol/react-web';
import { LensConfig, development } from '@lens-protocol/react-web';
import { bindings as wagmiBindings } from '@lens-protocol/wagmi';

import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public'
import { LoginButton } from './loginComponent';
import HeroSection from './heroSection';
import TeamSection from './teamSection';
import FooterSection from './footerSection';
import FeatureSection from './featureSection';
import ContentSection from './contentSection';
const { provider, webSocketProvider } = configureChains([polygon, mainnet], [publicProvider()]);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: development,
};

export default function Home() {
  return (
    <WagmiConfig client={client}>
      <LensProvider config={lensConfig}>
        <HeroSection/>
        <ContentSection/>
        <FeatureSection/>
        <TeamSection/>
        <FooterSection/>
        {/* <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <LoginButton/>
        </div> */}
      </LensProvider>
    </WagmiConfig>
  )
}
