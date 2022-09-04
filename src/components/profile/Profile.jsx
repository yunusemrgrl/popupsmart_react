import { Box, Button, Flex } from '@chakra-ui/react';

// COMPONENTS

import { useAuth } from '../../context/AuthContext';

function Profile() {
  const { user, logout } = useAuth();

  return (
    <div>
      {user && (
        <Flex
          bg='gray.100'
          direction='column'
          align='center'
          justify='center'
          h='100vh'
        >
          <Box bg='white' p={6} rounded='md' w={64}>
            User Email : {user}
          </Box>
          <Button
            colorScheme='purple'
            type='button'
            mt={19}
            onClick={() => {
              logout();
            }}
          >
            Logout
          </Button>
        </Flex>
      )}
    </div>
  );
}

export default Profile;
