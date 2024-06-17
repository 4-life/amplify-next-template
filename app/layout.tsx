import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import { Container, Flex, Spacer } from '@chakra-ui/react';
import config from '@/config';
import { ReactChildren } from '@/lib/types';
import { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import fonts from './fonts';

/**
 * Default metadata.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata
 */
export const metadata: Metadata = {
  title: config.siteName,
  description: config.siteDescription,
};

/**
 * The homepage root layout.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/layout
 */
export default function RootLayout({ children }: ReactChildren): JSX.Element {
  return (
    <html lang="en" className={fonts.rubik.variable}>
      <head />
      <body>
        <Providers>
          <Container maxW="container.lg" minH="100vh">
            <Flex flexDirection="column" minH="100vh" gap={4}>
              <Header />
              <main>{children}</main>
              <Spacer />
              <Footer />
            </Flex>
          </Container>
        </Providers>
      </body>
    </html>
  );
}
