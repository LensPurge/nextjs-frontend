import { useWalletLogin } from '@lens-protocol/react-web';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { mainnet, optimism } from 'wagmi/chains';

export function LoginButton() {
  const { execute: login, error: loginError, isPending: isLoginPending } = useWalletLogin();

  const { isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();

  const { connectAsync } = useConnect({
    connector: new InjectedConnector()
  });

  const onLoginClick = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    const { connector } = await connectAsync();

    if (connector instanceof InjectedConnector) {
      const signer = await connector.getSigner();
      await login(signer);

	  console.log("signer: ", signer);
    }
  };
 
  return (
    <div>
      {loginError && <p>{loginError.message}</p>}
      <button disabled={isLoginPending} onClick={onLoginClick}>Log in</button>
    </div>
  );
}
