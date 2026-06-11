import Head from 'next/head';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Head>
        <title>Jacob Walton — Developer</title>
        <meta name="description" content="Developer portfolio - Jacob Walton" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <meta name="apple-mobile-web-app-title" content="Portfolio" />
      </Head>
      <Hero />
      <Projects />
      <About />
      <Contact />
    </>
  );
}
