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
import Link from 'next/link';
import Navbar from '../components/all/navbar';

const Dashboard: NextPage = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();

  if (typeof window !== 'undefined') {
    // it's using == instead of === because it works and fixing it feels long just for some extra DX.
    if (sessionData == undefined) {
      router.push('/');
    }
  }

  const [currentChatId, setCurrentChatId] = useState('');

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

        <Container>
          <CreateChat />
          <Divider m={2} />
          <ChatList setCurrentChatId={setCurrentChatId} />
          <Divider m={2} />
          <ChatInterface currentChatId={currentChatId} />
        </Container>
      </main>
    </>
  );
};
export default Dashboard;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div>
      {sessionData && <p>Logged in as {sessionData?.user?.username}</p>}
      <Link href={'/account'}>
        <Button>Change Username & Other Settings</Button>
      </Link>
      <br />
      <Link href={'/dashboard'}>
        <Button>Dashboard</Button>
      </Link>
      <Link href={'/phonebook'}>
        <Button>Phonebook</Button>
      </Link>
      <Button onClick={sessionData ? () => signOut() : () => signIn()}>
        {sessionData ? 'Sign out' : 'Sign in'}
      </Button>
    </div>
  );
};
