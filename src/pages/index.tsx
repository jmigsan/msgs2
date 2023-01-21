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
  Heading,
  Stack,
  Text,
  Image,
} from '@chakra-ui/react';
import NavbarHome from '../components/all/NavbarHome';

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
        <NavbarHome />

        <Center>
          <Stack>
            <Box pt={9}>
              <Heading fontSize={'4xl'}>Make conversations!</Heading>
              <Center p={4}>
                <Text>Sign in and talk to people!</Text>
              </Center>
            </Box>
            <Button
              colorScheme={'yellow'}
              onClick={sessionData ? () => signOut() : () => signIn()}
            >
              {sessionData ? 'Sign out' : 'Sign in'}
            </Button>
          </Stack>
          <Box w={'lg'} p={10}>
            <Image
              src={
                'https://images.unsplash.com/photo-1513171920216-2640b288471b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80'
              }
            />
          </Box>
        </Center>
      </main>
    </>
  );
};

export default Home;
