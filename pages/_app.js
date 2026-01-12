import Layout from "../components/Layout";
import "../styles/globals.css";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  // No background image — keep site solid black.
  useEffect(() => {
    // intentionally left blank
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
