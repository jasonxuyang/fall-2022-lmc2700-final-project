import { IState } from "../types";
import Landing from "./landing";

export default function Index(pageProps: { initialState: IState }) {
  return <Landing />;
}
