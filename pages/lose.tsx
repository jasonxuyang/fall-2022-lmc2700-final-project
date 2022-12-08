import Link from "next/link";
import { INITIAL_STATE } from "../data";
import styles from "./landing.module.scss";

export default function Landing() {
  //
  // // Render
  //
  return (
    <div>
      <main className={styles.main}>
        <h1>Unfortuante.</h1>
        <p>You dropped out :/</p>

        <Link
          href="/game"
          onClick={() =>
            sessionStorage.setItem("state", JSON.stringify(INITIAL_STATE))
          }
        >
          <button>Play Again</button>
        </Link>
      </main>
    </div>
  );
}
