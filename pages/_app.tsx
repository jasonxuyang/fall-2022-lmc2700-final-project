import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { INITAL_STATE, IState } from "../types";

export default function App({ Component, pageProps }: AppProps) {
  const [initialState, setInitialState] = useState<IState | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // persist state through refreshes and network failures through session storage
  useEffect(() => {
    const stateInSessionStorage = sessionStorage.getItem("state") ?? null;
    setInitialState(
      stateInSessionStorage ? JSON.parse(stateInSessionStorage) : INITAL_STATE
    );
    setIsLoading(false);
  }, []);

  return (
    <>
      <Head>
        <title>Game Title</title>
        <meta name="description" content="Game Description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!isLoading && <Component {...pageProps} initialState={initialState} />}
    </>
  );
}
