import { Box, Text } from '@chakra-ui/react';
import { trpc } from '../../utils/trpc';

const PublicUserList = () => {
  const publicUsers = trpc.user.getPublicUsers.useQuery();

  if (publicUsers) {
    if (publicUsers.data?.length !== undefined) {
      if (publicUsers.data.length < 1) {
        return (
          <Box p={3}>
            <Text>No Public Users Available</Text>
          </Box>
        );
      }
    }

    return (
      <Box>
        {publicUsers.data?.map((user) => (
          <Box
            my={2}
            p={3}
            key={user.username}
            rounded={'lg'}
            bg={'yellow.100'}
          >
            <Text>{user.username}</Text>
          </Box>
        ))}
      </Box>
    );
  } else {
    return <></>;
  }
};
export default PublicUserList;
