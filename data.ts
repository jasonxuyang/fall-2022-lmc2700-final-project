import {
  IState,
  INITIAL_TIME_PER_LEVEL,
  IEvent,
  EVENT_PROMPT_TIME,
  INITIAL_ATTEMPTS_ALLOWED,
  PUZZLE,
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
  currentPuzzle: null,
  puzzlesCompleted: [],
  hints: [],
};

export const EVENTS: IEvent[] = [
  {
    level: 1,
    levelTime: EVENT_PROMPT_TIME,
    title: "Join greek life or join a research lab?",
    prompt: "Greek life: +1 hint | Research: + 1 min for this year",
    choices: [
      {
        text: "Greek Life",
        attribute: "social",
        effect: "hint",
        hint: "It's a very popular lullaby.",
      },
      {
        text: "Research",
        attribute: "studious",
        effect: "timePerLevel",
      },
    ],
  },
  {
    level: 2,
    levelTime: EVENT_PROMPT_TIME,
    title: "Go to a party or work on a group project?",
    prompt: "Party: +1 hint | Group project: +1 min for this year",
    choices: [
      {
        text: "Party",
        attribute: "social",
        effect: "hint",
        hint: "Use your eyes?",
      },
      {
        text: "Group Project",
        attribute: "studious",
        effect: "timePerLevel",
      },
    ],
  },
  {
    level: 3,
    levelTime: EVENT_PROMPT_TIME,
    title: "Start doing Leetcode or make new friends at the gym.",
    prompt: "Leetcode: +1 min for this year | Gym Friends: +1 hint",
    choices: [
      {
        text: "Leetcode",
        attribute: "studious",
        effect: "timePerLevel",
      },
      {
        text: "Gym",
        attribute: "social",
        effect: "hint",
        hint: "Google is pretty helpful.",
      },
    ],
  },
  {
    level: 4,
    levelTime: EVENT_PROMPT_TIME,
    title: "asdfa",
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
  {
    level: 5,
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
  {
    level: 6,
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
