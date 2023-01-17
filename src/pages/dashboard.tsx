import type { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '../utils/trpc';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Button, Divider, Input } from '@chakra-ui/react';
import { useState } from 'react';
import CreateChat from '../components/dashboard/CreateChat';
import ChatList from '../components/dashboard/ChatList';

const Dashboard = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();

  if (sessionData === undefined) {
    router.push('/');
  }

  return (
    <>
      <Head>
        <title>msgs2</title>
        <meta name='description' content='Send messages to each other' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <CreateChat />
        <Divider />
        <ChatList />
      </main>
    </>
  );
};
export default Dashboard;
