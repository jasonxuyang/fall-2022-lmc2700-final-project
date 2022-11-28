export const SECOND = 1;
export const MINUTE = 60 * SECOND;
export const INITIAL_TIME_PER_LEVEL = 5 * MINUTE;
export const EVENT_PROMPT_TIME = 5;
export const TOTAL_LEVELS = 6;

export const INITAL_STATE: IState = {
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

export enum TIMER_STATUS {
  RUNNING = "RUNNING",
  PAUSED = "PAUSED",
  STOPPED = "STOPPED",
}

export interface IState {
  level: number;
  levelTime: number;
  timePerLevel: number;
  studiousLevel: number;
  socialLevel: number;
  isPaused: boolean;
  event: IEvent | null;
  completedEvents: IEvent[];
}

export interface IEvent {
  level: number;
  levelTime: number;
  prompt: string;
  choices: IEventChoice[];
}

export interface IEventChoice {
  text: string;
  attribute: "studious" | "social";
  effect: "timePerLevel" | "hint";
}
