export const SECOND = 1;
export const MINUTE = 60 * SECOND;
export const INITIAL_TIME_PER_LEVEL = 5 * MINUTE;
export const EVENT_PROMPT_TIME = 5;
export const TOTAL_LEVELS = 6;

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
