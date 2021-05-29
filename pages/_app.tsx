import type { AppProps } from 'next/app'
import '@s/globals.css'
import Head from 'next/head'
import Header from '@c/molecules/Header';
import Footer from '@c/molecules/Footer';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta lang="ja-JP" />
        {/* <link rel="canonical" href="" /> */}

        {/* icon */}
        <link rel="icon" sizes="16x16 24x24 32x32 48x48 64x64 128x128 256x256" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="144x144" href="/logo-144x144.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/logo-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/logo-512x512.png" />

        {/* webmanifest */}
        <link rel="manifest" href="/manifest.webmanifest" />

        {/* mobile */}
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="format-detection" content="telephone=no" />

        {/* apple-mobile */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Quantum Game Arena" />
        <link rel="apple-touch-icon" sizes="192x192" href="/logo-192x192.png" />

        {/* android */}
        <meta name="mobile-web-app-capable" content="yes" />

        <meta name="theme-color" content="#7a9de3" />
        <meta name="background-color" content="#ffffff" />
        <meta name="application-name" content="Quantum Game Arena" />
        <meta name="description" content="Quantum Game Arena は，ゲームを通じて量子力学的世界観を養うことを目的とした量子ゲームの遊び場です．" />
        <meta name="keywords" content="education,games" />

        <title>Quantum Game Arena</title>

        {/* ogp */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Quantum Game Arena" />
        <meta property="og:description" content="Quantum Game Arena は，ゲームを通じて量子力学的世界観を養うことを目的とした量子ゲームの遊び場です．" />
        <meta property="og:site_name" content="Quantum Game Arena" />
        {/* <meta property="og:url" content="https://xxx" /> */}
        {/* <meta property="og:image" content="https://xxx/ogp-img.png" /> */}

        {/* facebook */}
        {/* <meta property="fb:app_id" content="" /> */}

        {/* twitter */}
        <meta name="twitter:card" content="summary" />
        {/* <meta name="twitter:url" content="https://xxx" /> */}
        {/* <meta name="twitter:site" content="https://xxx" /> */}
        <meta name="twitter:title" content="Quantum Game Arena" />
        <meta name="twitter:description" content="量子ゲームの遊び場" />
        {/* <meta name="twitter:image" content="https://xxx/ogp-img.png" /> */}
        <meta name="twitter:creator" content="@QGameArena" />

      </Head>

      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
