import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { Provider as StoreProvider } from "react-redux";
import { store } from "store/store";
import {
  Client,
  defaultExchanges,
  subscriptionExchange,
  Provider as UrqlProvider,
} from "urql";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [client, setClient] = useState<Client>();
  useEffect(() => {
    // console.log(process.env.NEXT_PUBLIC_SERVER);
    const IP = "192.168.43.184";
    const PORT = "8121";
    const LOCAL_SERVER = `${IP}:${PORT}`;
    const LOCAL_PREFIX = "http";
    const LOCAL_SOCKET_PREFIX = "ws";
    const PREFIX = "https";
    const SOCKET_PREFIX = "wss";
    const SERVER = process.env.NEXT_PUBLIC_SERVER;

    const subscriptionClient = new SubscriptionClient(
      `${SOCKET_PREFIX}://${SERVER}/graphql`,
      {
        reconnect: true,
      }
    );
    subscriptionClient.onConnected(() => {
      console.log("subscriptionClient connected");
    });
    subscriptionClient.onError(() => {
      console.log("subscriptionClient error");
    });
    const client = new Client({
      url: `${PREFIX}://${SERVER}/graphql`,
      exchanges: [
        ...defaultExchanges,
        subscriptionExchange({
          forwardSubscription: (operation) =>
            subscriptionClient.request(operation) as any,
        }),
      ],
    });
    setClient(client);
  }, []);
  return (
    <StoreProvider store={store}>
      <UrqlProvider value={client as any}>
        <div>
          <Head>
            <title>Whatsapp</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main>{client && <Component {...pageProps} />}</main>
        </div>
      </UrqlProvider>
    </StoreProvider>
  );
}
export default MyApp;
