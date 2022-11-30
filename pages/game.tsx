import { useEffect, useState } from "react";
import { useTimer } from "use-timer";
import { EVENTS, INITIAL_STATE } from "../data";
import Media from "../puzzles/Media/Media";
import MusicTechnology from "../puzzles/MusicTechnology/MusicTechnology";
import {
  EVENT_PROMPT_TIME,
  IEvent,
  IState,
  PUZZLE,
  TIMER_STATUS,
} from "../types";
import styles from "./game.module.scss";

export default function Game(pageProps: { initialState: IState }) {
  //
  // // Hooks
  //
  const [state, setState] = useState<IState>(pageProps.initialState);
  const {
    level,
    levelTime,
    timePerLevel,
    event,
    completedEvents,
    currentPuzzle,
  } = state;

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

  const enterPuzzle = (puzzle: PUZZLE) => {
    setState({
      ...state,
      currentPuzzle: puzzle,
    });
  };

  const exitPuzzle = () => {
    setState({
      ...state,
      currentPuzzle: null,
    });
  };

  const resetGame = () => {
    reset();
    setState(INITIAL_STATE);
    sessionStorage.setItem("state", JSON.stringify(state));
  };

  //
  // // Render
  //

  const renderGameStatus = () => {
    return (
      <div className={styles.statusBar}>
        <div>
          <div>
            <strong>Current Time:</strong> {levelTime}
          </div>
          <div>
            <strong>Current Level:</strong> {level}
          </div>
        </div>
        <button onClick={pause}>Pause Timer</button>
        <button onClick={start}>Start Timer</button>
        <button onClick={resetGame}>Reset Game</button>
      </div>
    );
  };

  const renderEvent = () => {
    return (
      <>
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
      </>
    );
  };
  return (
    <div>
      <main>
        {renderGameStatus()}
        {renderEvent()}
        {currentPuzzle === null && (
          <div className={styles.puzzlesGrid}>
            <button
              onClick={() => {
                enterPuzzle(PUZZLE.MUSIC_TECHNOLOGY);
              }}
            >
              Music Technology
            </button>
            <button
              onClick={() => {
                enterPuzzle(PUZZLE.MEDIA);
              }}
            >
              Media
            </button>
          </div>
        )}
        <div className={styles.puzzleContainer}>
          {currentPuzzle === PUZZLE.MUSIC_TECHNOLOGY && (
            <MusicTechnology
              state={state}
              setState={setState}
              exitPuzzle={exitPuzzle}
            />
          )}
        </div>
        <div className={styles.puzzleContainer}>
          {currentPuzzle === PUZZLE.MEDIA && (
          <Media
            state={state}
            setState={setState}
            exitPuzzle={exitPuzzle} 
            />
          )}
          </div>
      </main>
    </div>
  );
}
