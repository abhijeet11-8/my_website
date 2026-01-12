import Layout from "../components/Layout";
import "../styles/globals.css";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
    const bg = `${base}/images/bg.jpg`;
    // set CSS variable so globals.css can use it
    document.documentElement.style.setProperty('--site-bg', `url('${bg}')`);
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
