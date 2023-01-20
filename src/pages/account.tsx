import type { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '../utils/trpc';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Button, Container, Divider, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import CreateChat from '../components/dashboard/CreateChat';
import ChatList from '../components/dashboard/ChatList';
import ChatInterface from '../components/dashboard/ChatInterface';
import UsernameChange from '../components/dashboard/UsernameChange';
import Link from 'next/link';

const Account: NextPage = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();

  if (typeof window !== 'undefined') {
    // it's using == instead of === because it works and fixing it feels long just for some extra DX.
    if (sessionData == undefined) {
      router.push('/');
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
        <AuthShowcase />

        <Container>
          <UsernameChange />
        </Container>
      </main>
    </>
  );
};
export default Account;

const AuthShowcase: React.FC = () => {
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();

  const { data: sessionData } = useSession();

  return (
    <div>
      {sessionData && <p>Logged in as {sessionData?.user?.username}</p>}
      <Link href={'/dashboard'}>
        <Button>Go Home</Button>
      </Link>
      {secretMessage && <p>{secretMessage}</p>}
      <Button onClick={sessionData ? () => signOut() : () => signIn()}>
        {sessionData ? 'Sign out' : 'Sign in'}
      </Button>
    </div>
  );
};
