import { Grid, Image, Link } from '@chakra-ui/react';
import { useColorMode } from 'lib/components/ui/color-mode';

const Badges = () => {
  const { colorMode } = useColorMode();

  return (
    <Grid width="full" gap={2} marginY={2}>
      <Link
        href="https://www.producthunt.com/posts/gaas?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-gaas"
        target="_blank"
        margin={['auto', 'auto', '0 0 0 auto']}
      >
        <Image
          src={`https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=279696&theme=${colorMode}`}
          alt="GaaS - Greetings as a Service | Product Hunt"
          height={{ base: '32px', md: '40px' }}
        />
      </Link>
    </Grid>
  );
};

export default Badges;
