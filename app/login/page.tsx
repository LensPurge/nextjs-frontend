"use client";
import { LoginButton } from "./login-button";
import { LensProvider, LensConfig, development } from "@lens-protocol/react-web";
import { bindings as wagmiBindings } from "@lens-protocol/wagmi";

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: development,
};

export default function Login() {
  return (
    <LensProvider config={lensConfig}>
      <LoginButton />
    </LensProvider>
  );
}
