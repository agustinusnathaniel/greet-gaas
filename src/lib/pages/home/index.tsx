import {
  Button,
  Link as ChakraLink,
  Grid,
  Heading,
  Image,
} from '@chakra-ui/react';
import Link from 'next/link';
import Balancer from 'react-wrap-balancer';

const Home = () => {
  return (
    <Grid gap={8} marginY={[8, 16]} w="full" textAlign="center">
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
        alignItems="center"
        gap={4}
      >
        <Grid alignItems="center">
          <Image
            marginX="auto"
            width={{ base: 160, sm: 200, md: 240 }}
            src="/High five-cuate.svg"
            alt="illustration"
          />
          <ChakraLink fontSize="xs" isExternal href="https://storyset.com/">
            Illustration by Freepik Storyset
          </ChakraLink>
        </Grid>

        <Heading
          letterSpacing={1}
          size="2xl"
          fontWeight="extrabold"
          textAlign={{ base: 'center', md: 'start' }}
        >
          <Balancer>Create Greetings for your Folks!</Balancer>
        </Heading>
      </Grid>

      <Button
        as={Link}
        href="/create"
        size="lg"
        marginX={[0, 16, 32]}
        colorScheme="blue"
      >
        Create One
      </Button>
    </Grid>
  );
};

export default Home;
