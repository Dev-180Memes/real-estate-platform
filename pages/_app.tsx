import Router from 'next/router';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import NProgress from 'nprogress';
import { Toaster } from 'react-hot-toast';

import Layout from '../components/Layout';

import "@uploadthing/react/styles.css";

function MyApp({ Component, pageProps }: { Component: React.ElementType, pageProps: Record<string, any> }) {
  NProgress.configure({ showSpinner: false });

  Router.events.on('routeChangeStart', () => {
    NProgress.start();
  });

  Router.events.on('routeChangeComplete', () => {
    NProgress.done();
  });

  return (
    <>
      <Head>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css' integrity='sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==' crossOrigin='anonymous' referrerPolicy='no-referrer' />
      </Head>
      <ChakraProvider>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
