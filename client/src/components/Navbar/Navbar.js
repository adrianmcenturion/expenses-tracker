import { Box, Flex, HStack, Link, Container, IconButton, Button, useDisclosure, useColorMode, useColorModeValue, Stack, Spacer } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link as RouteLink } from "react-router-dom";
  
  const Links = ['home', 'login', 'register', 'admin'];
  
  const NavLink = ({ children }) => (
    <Link
      as={RouteLink}
      to={`/${children}`}
      fontWeight={'bold'}
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
      }}
      textTransform={'capitalize'}
      >
        {children}
    </Link>
  );
  
  export default function Simple() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
  
    return (
      <>
        <Box  id='home' bg={useColorModeValue('gray.100', 'gray.900')}>
          <Flex w={'100%'}  py={2} >
          <Container maxW={'container.lg'}>
          <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
          <HStack
                justify="center"
                gap={12}
                as={'nav'}
                spacing={8}
                display={{ base: 'none', md: 'flex' }}>
                <Spacer />
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
                <Spacer />
              <Button onClick={toggleColorMode}>
                  {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
              </HStack>
              </Container>
          </Flex>
          
          {isOpen ? (
            <Box pb={4} px={4} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4} >
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
                
              </Stack>
            </Box>
          ) : null}
        </Box>
      </>
    );
  }