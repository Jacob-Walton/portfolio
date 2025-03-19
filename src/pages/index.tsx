import Head from 'next/head'
import LandingPage from '../components/LandingPage'

export default function Home() {
  return (
    <>
      <Head>
        <title>Jacob Walton | Developer</title>
        <meta name="description" content="Jacob Walton's Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingPage />
    </>
  )
}