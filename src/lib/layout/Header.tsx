import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';

import AppMenu from './AppMenu';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <Flex alignSelf="start" as="header" width="full" align="center">
      <Link href="/">
        <Heading as="h1" letterSpacing={2} fontSize="lg" fontStyle="italic">
          GaaS
        </Heading>
        <Text fontSize="xs">Greetings as a Service</Text>
      </Link>

      <Box marginLeft="auto">
        <ThemeToggle />
        <AppMenu />
      </Box>
    </Flex>
  );
};

export default Header;
