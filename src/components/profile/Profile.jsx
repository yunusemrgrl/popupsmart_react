import { Box, Button, Flex } from '@chakra-ui/react';
import './profile.scss';

// COMPONENTS
import { useAuth } from '../../context/AuthContext';
import TodoHeader from './TodoHeader';
import TodoMain from './TodoMain';
import TodoFooter from './TodoFooter';
function Profile() {
  const { user, logout } = useAuth();

  return (
    <Flex flexDirection={'column'}>
      <Box>
        {user && (
          <Flex px={4} align='top' justify='flex-end'>
            <Flex
              wordBreak={'break-all'}
              p={6}
              fontSize={20}
              fontWeight={'semibold'}
            >
              {user}
            </Flex>
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
        <Flex direction={'column'} align={'center'}>
          <TodoHeader />
          <TodoMain />
        </Flex>
        <TodoFooter />
      </Box>
    </Flex>
  );
}

export default Profile;
