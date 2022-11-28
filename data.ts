import {
  IState,
  INITIAL_TIME_PER_LEVEL,
  IEvent,
  EVENT_PROMPT_TIME,
} from "./types";

export const INITIAL_STATE: IState = {
  level: 1,
  levelTime: 0,
  timePerLevel: INITIAL_TIME_PER_LEVEL,
  studiousLevel: 0,
  socialLevel: 0,
  isPaused: false,
  event: null,
  completedEvents: [],
};

export const EVENTS: IEvent[] = [
  {
    level: 1,
    levelTime: EVENT_PROMPT_TIME,
    prompt: "Test Event 1",
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
    prompt: "Test Event 2",
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
