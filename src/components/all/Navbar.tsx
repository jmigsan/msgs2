import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link as ChakraLink,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  Heading,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const NavLink = ({ link, text }: { link: string; text: string }) => (
  <Link href={link}>
    <ChakraLink
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={link}
    >
      {text}
    </ChakraLink>
  </Link>
);

const Simple = () => {
  const { data: sessionData } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Heading fontSize={'xl'}>💬 msgs2</Heading>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              <NavLink link={'/dashboard'} text={'Dashboard'} />
              <NavLink link={'/phonebook'} text={'Phonebook'} />
              <NavLink link={'/account'} text={'Account Settings'} />
            </HStack>
          </HStack>
          <HStack>
            {sessionData && (
              <>
                <Text>Logged in as {sessionData?.user?.username}</Text>
                <Avatar size={'sm'} src={sessionData?.user?.image as string} />
              </>
            )}
            <Button onClick={sessionData ? () => signOut() : () => signIn()}>
              {sessionData ? 'Sign out' : 'Sign in'}
            </Button>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <NavLink link={'/dashboard'} text={'Dashboard'} />
              <NavLink link={'/phonebook'} text={'Phonebook'} />
              <NavLink link={'/account'} text={'Account Settings'} />
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Simple;
