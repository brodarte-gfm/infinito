import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { AppNavBar } from "../components/AppNavBar";
import style from "./app.module.css";

const appLinks = [{ label: "List A", path: "/A"}, { label: "List B", path: "/B"}, { label: "List C", path: "/C"}]

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Infinito</title>
      </Head>
      <AppNavBar links={appLinks} className={style.navBar}/>
      <main className={style.mainContent}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
