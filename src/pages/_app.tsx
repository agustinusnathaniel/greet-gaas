import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeProvider } from 'lib/components/ui/color-mode';
import { Toaster } from 'lib/components/ui/toaster';
import Layout from 'lib/layout';
import { system } from 'lib/styles/theme';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import 'lib/styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
          />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Toaster />
      </ColorModeProvider>
    </ChakraProvider>
  );
};

export default MyApp;
