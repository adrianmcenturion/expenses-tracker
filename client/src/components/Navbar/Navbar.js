import { Box, Flex, HStack, Link, Container, IconButton, useDisclosure, useColorMode, useColorModeValue, Stack, Spacer } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link as RouteLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from '../Logout/Logout'
import { AdminRoutes, PrivateRoutes, PublicRoutes } from '../../models/routes';
  

  export default function Simple() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const token = useSelector(state => state.auth.token)
    const rol = useSelector(state => state.auth.userInfo.role)

    const NavLink = () => (
      <>
      <Link as={RouteLink} to={`/${PrivateRoutes.HOME}`} replace={true} fontWeight={'bold'} rounded={'md'} _hover={{ textDecoration: 'none' }} textTransform={'capitalize'} >Dashboard</Link>
      {rol === 'admin' && <Link as={RouteLink} to={`/${AdminRoutes.ADMIN}`} replace={true} fontWeight={'bold'} rounded={'md'} _hover={{ textDecoration: 'none' }} textTransform={'capitalize'} >Admin</Link>}
      {token ? null : <Link as={RouteLink} to={`/${PublicRoutes.LOGIN}`} replace={true} fontWeight={'bold'} rounded={'md'} _hover={{ textDecoration: 'none' }} textTransform={'capitalize'} >Login</Link>}
      {token ? null : <Link as={RouteLink} to={`/${PublicRoutes.REGISTER}`} replace={true} fontWeight={'bold'} rounded={'md'} _hover={{ textDecoration: 'none' }} textTransform={'capitalize'} >Register</Link>}
      </>
    );
  
    return (
      <>
        <Box  id='home' bg={'rgba(0,0,0,0.025)'} borderRadius={6} borderTop={false} border={'1px solid'} borderColor={useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)')}>
          <Container maxW={'container.lg'}>
          <Flex w={'100%'} py={2} justifyContent={'space-between'} gap={4}>
            <IconButton
                size={'md'}
                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                aria-label={'Open Menu'}
                display={{ md: 'none' }}
                onClick={isOpen ? onClose : onOpen}
              />
            <HStack
                  justify="center"
                  gap={6}
                  as={'nav'}
                  spacing={8}
                  display={{ base: 'none', md: 'flex' }}>
                  <Spacer />
                  {<NavLink/>}
              </HStack>
              <Spacer />
                  {token && <Logout />}
                  <IconButton onClick={toggleColorMode} variant={'ghost'} icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}/>
            </Flex>
            </Container>
          
          {isOpen ? (
            <Box pb={4} px={4} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4} >
                {<NavLink/>}
              </Stack>
            </Box>
          ) : null}
        </Box>
      </>
    );
  }