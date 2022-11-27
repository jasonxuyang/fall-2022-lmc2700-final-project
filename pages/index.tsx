import Head from "next/head";
import { useEffect, useState } from "react";
import { useTimer } from "use-timer";
import styles from "../styles/Home.module.css";
import { INITAL_STATE, IState, TIMER_STATUS } from "../types";

export default function Game(pageProps: { initialState: IState }) {
  const [state, setState] = useState<IState>(pageProps.initialState);
  const { time, start, pause, reset, status, advanceTime } = useTimer({
    initialTime: 0,
    endTime: state.timePerLevel,
    onTimeUpdate: () => {
      setState({
        ...state,
        levelTime: time,
        isPaused: status === TIMER_STATUS.PAUSED,
      });
      sessionStorage.setItem("state", JSON.stringify(state));
    },
    onTimeOver: () => {
      setState({
        ...state,
        level: state.level + 1,
        isPaused: status === TIMER_STATUS.PAUSED,
      });
      reset();
      start();
    },
  });

  useEffect(() => {
    if (pageProps.initialState.levelTime > 0) {
      advanceTime(pageProps.initialState.levelTime);
    }
    start();
  }, [advanceTime, pageProps.initialState.levelTime, start]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div>Current Time: {state.levelTime}</div>
        <div>Current Level: {state.level}</div>
        <button onClick={pause}>Pause Timer</button>
        <button onClick={start}>Start Timer</button>
      </main>
    </div>
  );
}
