import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
    const bg = `${base}/images/bg.jpg`;

    return (
      <Html>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: `:root{--site-bg: url('${bg}')}` }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
