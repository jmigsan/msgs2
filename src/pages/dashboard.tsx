import type { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '../utils/trpc';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  HStack,
  Input,
  Text,
} from '@chakra-ui/react';
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

        <Center pt={6}>
          <Box>
            <HStack>
              <Box>
                <CreateChat />
                <Divider p={2} />
                <ChatList setCurrentChatId={setCurrentChatId} />
              </Box>
              <Box>
                <ChatInterface currentChatId={currentChatId} />
              </Box>
            </HStack>
          </Box>
        </Center>
      </main>
    </>
  );
};
export default Dashboard;
