"use client";
import { LensProvider } from '@lens-protocol/react-web';
import { LensConfig, development } from '@lens-protocol/react-web';
import { bindings as wagmiBindings } from '@lens-protocol/wagmi';

import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygon, polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public'
import HeroSection from '../components/heroSection';
import TeamSection from '../components/teamSection';
import FooterSection from '../components/footerSection';
import FeatureSection from '../components/featureSection';
import ContentSection from '../components/contentSection';
import FaqSection from '@/components/faqSection';
const { provider, webSocketProvider } = configureChains([polygon, polygonMumbai], [publicProvider()]);

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
        <FaqSection/>
        <TeamSection/>
        <FooterSection/>
        {/* <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <LoginButton/>
        </div> */}
      </LensProvider>
    </WagmiConfig>
  )
}
