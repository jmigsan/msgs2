import type { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '../utils/trpc';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import CreateChat from '../components/dashboard/CreateChat';
import ChatList from '../components/dashboard/ChatList';
import ChatInterface from '../components/dashboard/ChatInterface';
import Link from 'next/link';
import PublicUserList from '../components/phonebook/PublicUserList';
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

  return (
    <>
      <Head>
        <title>msgs2</title>
        <meta name='description' content='Send messages to each other' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Navbar />

        <Container>
          <Heading>Phonebook</Heading>
          <Text>
            Users which have chosen to become public. Use their username to add
            them.
          </Text>
          <PublicUserList />
        </Container>
      </main>
    </>
  );
};
export default Dashboard;
