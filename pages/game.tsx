import Head from "next/head";
import { useEffect, useState } from "react";
import { useTimer } from "use-timer";
import { EVENTS, INITIAL_STATE } from "../data";
import { EVENT_PROMPT_TIME, IEvent, IState, TIMER_STATUS } from "../types";

export default function Game(pageProps: { initialState: IState }) {
  //
  // // Hooks
  //
  const [state, setState] = useState<IState>(pageProps.initialState);
  const { level, levelTime, timePerLevel, event, completedEvents } = state;

  // Timer logic
  const { time, start, pause, reset, status, advanceTime } = useTimer({
    initialTime: 0,
    endTime: timePerLevel,
    onTimeUpdate: () => {
      if (time >= EVENT_PROMPT_TIME) {
        const event =
          EVENTS.find((event) => {
            return event.level === level;
          }) || null;

        if (!completedEvents.some((event) => event?.level === level)) {
          setState({
            ...state,
            event: event,
            levelTime: time,
            isPaused: status === TIMER_STATUS.PAUSED,
          });
          pause();
        } else {
          setState({
            ...state,
            levelTime: time,
          });
        }
      } else {
        setState({
          ...state,
          levelTime: time,
        });
      }
      sessionStorage.setItem("state", JSON.stringify(state));
    },
    onTimeOver: () => {
      setState({
        ...state,
        level: level + 1,
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

  //
  // // Helpers
  //
  const consumeEvent = () => {
    const updatedCompletedEvents = [...completedEvents, event as IEvent];
    setState({
      ...state,
      completedEvents: updatedCompletedEvents,
      event: null,
      levelTime: time,
    });
    start();
  };

  const resetGame = () => {
    setState(INITIAL_STATE);
  };

  //
  // // Render
  //
  return (
    <div>
      <main>
        <div>Current Time: {levelTime}</div>
        <div>Current Level: {level}</div>
        <button onClick={pause}>Pause Timer</button>
        <button onClick={start}>Start Timer</button>
        <div>Current Event: {event ? event.prompt : "No event active"}</div>
        {event ? (
          <>
            {event.choices.map((choice, index) => {
              return (
                <button key={index} onClick={consumeEvent}>
                  {choice.text}
                </button>
              );
            })}
          </>
        ) : null}
      </main>
    </div>
  );
}
