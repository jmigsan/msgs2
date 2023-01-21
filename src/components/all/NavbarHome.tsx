import { ReactNode } from 'react';
import {
  Box,
  Flex,
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
        bg: useColorModeValue('yellow.200', 'yellow.700'),
      }}
      href={link}
    >
      {text}
    </ChakraLink>
  </Link>
);

const Simple = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Box bg={useColorModeValue('yellow.100', 'yellow.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box />
          <HStack spacing={8} alignItems={'center'}>
            <Link href={'/'}>
              <ChakraLink href='/'>
                <Heading fontSize={'xl'}>💬 msgs2</Heading>
              </ChakraLink>
            </Link>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            ></HStack>
          </HStack>
          <HStack>
            <Button
              colorScheme={'yellow'}
              onClick={sessionData ? () => signOut() : () => signIn()}
            >
              {sessionData ? 'Sign out' : 'Sign in'}
            </Button>
          </HStack>
        </Flex>
      </Box>
    </>
  );
};

export default Simple;
