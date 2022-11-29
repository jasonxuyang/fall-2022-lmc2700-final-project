export const SECOND = 1;
export const MINUTE = 60 * SECOND;
export const INITIAL_TIME_PER_LEVEL = 5 * MINUTE;
export const EVENT_PROMPT_TIME = 5;
export const TOTAL_LEVELS = 6;
export const INITIAL_ATTEMPTS_ALLOWED = 3;

export enum TIMER_STATUS {
  RUNNING = "RUNNING",
  PAUSED = "PAUSED",
  STOPPED = "STOPPED",
}

export enum PUZZLE_STATUS {
  IN_PROGRESS = "IN_PROGRESS",
  CORRECT = "CORRECT",
  INCORRECT = "INCORRECT",
}

export enum PUZZLE {
  MUSIC_TECHNOLOGY = "MUSIC TECHNOLOGY",
}

export interface IState {
  level: number;
  levelTime: number;
  timePerLevel: number;
  studiousLevel: number;
  socialLevel: number;
  isPaused: boolean;
  event: IEvent | null;
  currentPuzzle: PUZZLE | null;
  completedEvents: IEvent[];
  puzzleStates: any;
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

export interface IPuzzleProps {
  state: IState;
  setState: (newState: IState) => void;
  exitPuzzle: () => void;
}
