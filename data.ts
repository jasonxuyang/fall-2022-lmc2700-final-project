import {
  IState,
  INITIAL_TIME_PER_LEVEL,
  IEvent,
  EVENT_PROMPT_TIME,
  INITIAL_ATTEMPTS_ALLOWED,
  PUZZLE_STATUS,
  PUZZLE,
} from "./types";

export const INITIAL_PUZZLES_STATES = {
  [PUZZLE.MUSIC_TECHNOLOGY]: {
    attemptsLeft: INITIAL_ATTEMPTS_ALLOWED,
    status: PUZZLE_STATUS.IN_PROGRESS,
  },
};

export const INITIAL_STATE: IState = {
  level: 1,
  levelTime: 0,
  timePerLevel: INITIAL_TIME_PER_LEVEL,
  studiousLevel: 0,
  socialLevel: 0,
  isPaused: false,
  event: null,
  completedEvents: [],
  currentPuzzle: null,
  puzzleStates: INITIAL_PUZZLES_STATES,
};

export const EVENTS: IEvent[] = [
  {
    level: 1,
    levelTime: EVENT_PROMPT_TIME,
    title: "Test Event 1",
    prompt: "Test Prompt 1",
    choices: [
      {
        text: "Choice 1",
        attribute: "social",
        effect: "hint",
      },
      {
        text: "Choice 2",
        attribute: "social",
        effect: "hint",
      },
    ],
  },
  {
    level: 2,
    levelTime: EVENT_PROMPT_TIME,
    title: "Test Event 2",
    prompt: "Test Prompt 2",
    choices: [
      {
        text: "Choice 1",
        attribute: "social",
        effect: "hint",
      },
      {
        text: "Choice 2",
        attribute: "social",
        effect: "hint",
      },
    ],
  },
];
