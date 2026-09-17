import { Box, Grid, Link, Text } from '@chakra-ui/react';

import Badges from './Badges';

const Footer = () => {
  return (
    <Grid
      as="footer"
      width="full"
      textAlign={['center', 'center', 'inherit']}
      templateColumns={['repeat(1)', 'repeat(1)', 'repeat(2, 1fr)']}
      alignItems="center"
    >
      <Text fontSize="sm">
        {new Date().getFullYear()} |{' '}
        <Link
          fontWeight="bold"
          href="https://sznm.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          sznm.dev
        </Link>
      </Text>

      <Box textAlign={['center', 'center', 'right']}>
        <Badges />
      </Box>
    </Grid>
  );
};

export default Footer;
