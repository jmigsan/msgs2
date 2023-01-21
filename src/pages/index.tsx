import type { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '../utils/trpc';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/react';
import Navbar from '../components/all/Navbar';

const Home: NextPage = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();

  if (typeof window !== 'undefined') {
    // it's using != instead of !== because it works and fixing it feels long just for some extra DX.
    if (sessionData != undefined) {
      router.push('/dashboard');
    }
  }

  return (
    <>
      <Head>
        <title>msgs2</title>
        <meta name='description' content='Send messages to each other' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Navbar />
        {/* <AuthShowcase /> */}
      </main>
    </>
  );
};

export default Home;
