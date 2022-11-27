import Head from "next/head";
import { useState } from "react";
import { useTimer } from "use-timer";
import styles from "../styles/Home.module.css";
import { IState, TIMER_STATUS } from "../types";

export default function Game() {
  const [state, updateState] = useState<IState>({
    gameTime: 0,
    currentLevel: 0,
    studiousLevel: 0,
    socialLevel: 0,
    isPaused: false,
  });

  const { time, start, pause, reset, status } = useTimer({
    initialTime: 0,
    autostart: true,
    onTimeUpdate: () => {
      updateState({
        ...state,
        gameTime: time,
        isPaused: status === TIMER_STATUS.PAUSED,
      });
    },
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Game Title</title>
        <meta name="description" content="Game Description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>Current Time: {state.gameTime}</div>
        <button onClick={pause}>Pause Timer</button>
        <button onClick={start}>Start Timer</button>
      </main>
    </div>
  );
}
