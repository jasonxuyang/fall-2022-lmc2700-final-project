import Head from "next/head";
import { useEffect, useState } from "react";
import { useTimer } from "use-timer";
import { EVENTS } from "../data";
import { EVENT_PROMPT_TIME, IEvent, IState, TIMER_STATUS } from "../types";
import Landing from "./landing";

export default function Index(pageProps: { initialState: IState }) {
  return <Landing />;
}
