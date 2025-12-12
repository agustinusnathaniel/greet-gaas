import { Box, Grid, Heading, Image, Link, Text } from '@chakra-ui/react';
import MotionBox from 'lib/components/MotionBox';
import { NextSeo } from 'next-seo';

import { occasionTemplates } from './templates';
import type { GreetingsTemplateProps, OccasionTemplateType } from './types';

type OccasionWrapperProps = Pick<
  GreetingsTemplateProps,
  'occasion' | 'imageSrc'
>;

const imageSize = {
  base: 200,
  sm: 300,
};

const OccasionWrapper = ({ occasion, imageSrc }: OccasionWrapperProps) => {
  const selectedOccasionTemplate: OccasionTemplateType = occasionTemplates.find(
    ({ type }) => type === occasion,
  );

  return (
    <Grid gap={4} marginX={[0, 16, 32]} marginBottom={8}>
      <Heading fontFamily="heading">{selectedOccasionTemplate.title}</Heading>

      <MotionBox
        animate={{ y: 20 }}
        transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
        display="flex"
        justifyContent="center"
      >
        <Image
          src={imageSrc ?? selectedOccasionTemplate.imageSrc[0]}
          width={imageSize}
          height={imageSize}
          alt="illustration"
        />
      </MotionBox>

      {selectedOccasionTemplate.assetSource &&
        (selectedOccasionTemplate.assetSource.url ? (
          <Link
            href={selectedOccasionTemplate.assetSource.url}
            isExternal
            fontSize="xs"
          >
            Illlustration by {selectedOccasionTemplate.assetSource.name}
          </Link>
        ) : (
          <Text fontSize="xs">
            Illustration by {selectedOccasionTemplate.assetSource.name}
          </Text>
        ))}
    </Grid>
  );
};

const GreetingsTemplate = ({
  occasion,
  name,
  message,
  from,
  imageSrc,
}: GreetingsTemplateProps) => {
  const selectedOccasionTemplate: OccasionTemplateType = occasionTemplates.find(
    ({ type }) => type === occasion,
  );

  const description =
    message ?? 'Greetings%20as%20a%20Service%20|%20https://gaas.sznm.dev';

  return (
    <>
      <NextSeo
        title={`Hello ${name}, ${selectedOccasionTemplate.title}`}
        description={`${selectedOccasionTemplate.title} greetings for ${name}`}
        openGraph={{
          images: [
            {
              url: `https://og.sznm.dev/api/generate?heading=Hello%20${name},%20${selectedOccasionTemplate.title}&text=${description}&template=color&center=true`,
              alt: `${selectedOccasionTemplate.title} greetings for ${name} og-image`,
            },
          ],
        }}
      />
      <Grid textAlign="center" gap={2}>
        {name && (
          <Text fontSize="lg">
            Hello{' '}
            <Text as="span" textTransform="capitalize">
              {name}
            </Text>
            ,
          </Text>
        )}

        <OccasionWrapper occasion={occasion} imageSrc={imageSrc} />

        {message && <Text fontSize="sm">{message}</Text>}

        {from && (
          <Box marginTop={4}>
            <Text fontSize="xs">from:</Text>
            <Text>{from}</Text>
          </Box>
        )}
      </Grid>
    </>
  );
};

export default GreetingsTemplate;
