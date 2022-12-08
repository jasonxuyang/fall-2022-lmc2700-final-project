import { useEffect, useState } from "react";
import { useTimer } from "use-timer";
import { EVENTS, INITIAL_STATE } from "../data";
import Media from "../puzzles/Media/Media";
import Interaction from "../puzzles/Interaction/Interaction";
import MusicTechnology from "../puzzles/MusicTechnology/MusicTechnology";
import {
  EVENT_PROMPT_TIME,
  IEvent,
  IEventChoice,
  INITIAL_TIME_PER_LEVEL,
  IState,
  MINUTE,
  PUZZLE,
  TIMER_STATUS,
} from "../types";
import styles from "./game.module.scss";
import { fromMsToS } from "../helpers";

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
    puzzlesCompleted,
    hints,
  } = state;

  //
  // // Game state logic
  //
  const validateGameState = () => {
    if (state.level > 6) {
      alert("you lose");
    }
    if (state.puzzlesCompleted.length === Object.keys(PUZZLE).length) {
      alert("you win");
    }
  };

  //
  // Timer logic
  //
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
      validateGameState();
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
  const consumeEvent = (choice: IEventChoice) => {
    const updatedCompletedEvents = [...completedEvents, event as IEvent];
    const { effect, hint } = choice;
    if (effect === "timePerLevel") {
      setState({
        ...state,
        completedEvents: updatedCompletedEvents,
        event: null,
        levelTime: time - MINUTE,
      });
      reset();
    } else {
      setState({
        ...state,
        completedEvents: updatedCompletedEvents,
        event: null,
        levelTime: time,
        hints: [...hints, hint as string],
      });
    }
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

  const completePuzzle = (puzzle: PUZZLE) => {
    setState({
      ...state,
      puzzlesCompleted: [...puzzlesCompleted, puzzle],
      currentPuzzle: null,
    });
  };

  const isPuzzleComplete = (puzzle: PUZZLE) => {
    return puzzlesCompleted.some(
      (completedPuzzle) => completedPuzzle === puzzle
    );
  };

  const resetGame = () => {
    reset();
    setState(INITIAL_STATE);
    sessionStorage.setItem("state", JSON.stringify(state));
  };

  //
  // // Render
  //
  const renderHints = () => {
    return (
      <>
        {hints.map((hint, index) => {
          return <div key={index}>{hint}</div>;
        })}
      </>
    );
  };
  const renderGameStatus = () => {
    return (
      <div className={styles.statusBar}>
        <div>
          {renderHints()}
          <div>
            <strong>Time Left in Year:</strong>{" "}
            {fromMsToS(INITIAL_TIME_PER_LEVEL - levelTime)}
          </div>
          <div>
            <strong>Current Year:</strong> {level}
          </div>
        </div>
        <div className={styles.debugButtonContainer}>
          <button onClick={start}>Start Timer</button>
          <button onClick={pause}>Pause Timer</button>
          <button onClick={resetGame}>Reset Game</button>
        </div>
      </div>
    );
  };

  const renderEvent = () => {
    return (
      <>
        {event ? (
          <div className={styles.event}>
            <h3 className={styles.title}>{event.title}</h3>
            <p className={styles.prompt}>{event.prompt}</p>
            <div className={styles.choices}>
              {event.choices.map((choice, index) => {
                return (
                  <button key={index} onClick={() => consumeEvent(choice)}>
                    {choice.text}
                  </button>
                );
              })}
            </div>
            <p className={styles.pausedNote}>(Game is paused.)</p>
          </div>
        ) : null}
      </>
    );
  };
  return (
    <div>
      {renderGameStatus()}
      <div className={styles.main}>
        {renderEvent()}
        {currentPuzzle === null && event === null && (
          <div className={styles.puzzlesGrid}>
            {!isPuzzleComplete(PUZZLE.MUSIC_TECHNOLOGY) && (
              <button
                onClick={() => {
                  enterPuzzle(PUZZLE.MUSIC_TECHNOLOGY);
                }}
              >
                Music Technology
              </button>
            )}
            {!isPuzzleComplete(PUZZLE.MEDIA) && (
              <button
                onClick={() => {
                  enterPuzzle(PUZZLE.MEDIA);
                }}
              >
                Media
              </button>
            )}
            {!isPuzzleComplete(PUZZLE.INTERACTION) && (
              <button
                onClick={() => {
                  enterPuzzle(PUZZLE.INTERACTION);
                }}
              >
                Interaction Design
              </button>
            )}
          </div>
        )}
        {currentPuzzle !== null && event === null && (
          <div className={styles.puzzleContainer}>
            <div className={styles.backButton} onClick={exitPuzzle}>
              Exit Puzzle
            </div>
            {currentPuzzle === PUZZLE.MUSIC_TECHNOLOGY && (
              <MusicTechnology completePuzzle={completePuzzle} />
            )}
            {currentPuzzle === PUZZLE.MEDIA && (
              <Media completePuzzle={completePuzzle} />
            )}
            {currentPuzzle === PUZZLE.INTERACTION && (
              <Interaction completePuzzle={completePuzzle} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
