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
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import CreateChat from '../components/dashboard/CreateChat';
import ChatList from '../components/dashboard/ChatList';
import ChatInterface from '../components/dashboard/ChatInterface';
import Link from 'next/link';
import Navbar from '../components/all/Navbar';

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

        <Box display={{ base: 'none', lg: 'block' }}>
          <Center pt={5}>
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
        </Box>

        <Box display={{ base: 'block', lg: 'none' }}>
          <MobileView
            setCurrentChatId={setCurrentChatId}
            currentChatId={currentChatId}
          />
        </Box>
      </main>
    </>
  );
};
export default Dashboard;

const MobileView = ({
  setCurrentChatId,
  currentChatId,
}: {
  setCurrentChatId: any;
  currentChatId: any;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Center pt={5}>
      <Stack>
        <Button onClick={onOpen} colorScheme={'yellow'} bg={'yellow.100'}>
          Your Conversations
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <Box px={4} pt={2}>
              <ChatList setCurrentChatId={setCurrentChatId} />
            </Box>
            <ModalFooter>
              <Button colorScheme='yellow' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <ChatInterface currentChatId={currentChatId} />
      </Stack>
    </Center>
  );
};
