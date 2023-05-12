"use client";

import { LoginButton } from "./login-button";
import { LensProvider, staging, LensConfig } from "@lens-protocol/react-web";
import { bindings as wagmiBindings } from "@lens-protocol/wagmi";

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: staging,
};

export default function login() {
  return (
    <LensProvider config={lensConfig}>
      <LoginButton />
    </LensProvider>
  );
}
