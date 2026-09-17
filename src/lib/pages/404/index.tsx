import {
  Box,
  Button,
  Link as ChakraLink,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import { useColorMode } from 'lib/components/ui/color-mode';
import Link from 'next/link';

const Page404 = () => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Box width={['100%', '70%', '60%', '60%']} margin="0 auto">
        <Image src="/404 Error-pana.svg" alt="404-image" />
      </Box>
      <Text textAlign="center" fontSize="xs">
        <ChakraLink
          href="https://stories.freepik.com/web"
          target="_blank"
          rel="noopener noreferrer"
        >
          Illustration by Freepik Stories
        </ChakraLink>
      </Text>

      <Box marginY={4}>
        <Heading textAlign="center">Page not Found.</Heading>

        <Box textAlign="center" marginTop={4}>
          <Text>It&apos;s Okay!</Text>
          <Button
            asChild
            backgroundColor={colorMode === 'light' ? 'gray.300' : 'teal.500'}
          >
            <Link href="/">Let&apos;s Head Back</Link>
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Page404;
