import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Flex,
  Stack,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { getProviders, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import NavbarHome from '../../components/all/NavbarHome';

const SignIn: React.FC<{
  providers: {
    provider: {
      id: string;
      name: string;
      type: string;
      callbackUrl: string;
      signinUrl: string;
    };
  };
}> = ({ providers }) => {
  const router = useRouter();
  const { data: sessionData } = useSession();

  if (providers === undefined) {
    return null;
  }

  if (sessionData) {
    router.push(router.query.callbackUrl as string);
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
        <SignInPage providers={providers} />
      </main>
    </>
  );
};

const SignInPage = ({
  providers,
}: {
  providers: {
    provider: {
      id: string;
      name: string;
      type: string;
      callbackUrl: string;
      signinUrl: string;
    };
  };
}) => {
  const router = useRouter();

  return (
    <>
      <Flex align={'center'} justify={'center'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              and start conversations! 💬
            </Text>
          </Stack>
          <Center>
            {Object.values(providers).map((provider) => (
              <Box key={provider.name}>
                <Button
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl: router.query.callbackUrl as string,
                    })
                  }
                  colorScheme='yellow'
                >
                  Sign in with {provider.name}
                </Button>
              </Box>
            ))}
          </Center>
        </Stack>
      </Flex>
    </>
  );
};

export const getServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: { providers },
  };
};

export default SignIn;
