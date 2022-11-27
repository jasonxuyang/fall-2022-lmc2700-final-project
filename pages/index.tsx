import Head from "next/head";
import { useEffect, useState } from "react";
import { useTimer } from "use-timer";
import styles from "../styles/Home.module.css";
import { INITAL_STATE, IState, levelFromTime, TIMER_STATUS } from "../types";

export default function Game(pageProps: { initialState: IState }) {
  const [state, setState] = useState<IState>(pageProps.initialState);
  const { time, start, pause, reset, status } = useTimer({
    initialTime: state.gameTime,
    autostart: true,
    onTimeUpdate: () => {
      setState({
        ...state,
        gameTime: time,
        currentLevel: levelFromTime(time),
        isPaused: status === TIMER_STATUS.PAUSED,
      });
      sessionStorage.setItem("state", JSON.stringify(state));
    },
  });

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div>Current Time: {state.gameTime}</div>
        <div>Current Level: {state.currentLevel}</div>
        <button onClick={pause}>Pause Timer</button>
        <button onClick={start}>Start Timer</button>
      </main>
    </div>
  );
}
