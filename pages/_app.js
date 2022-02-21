import Layout from '@/components/layout';
import { ChakraProvider, Container } from '@chakra-ui/react';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Container maxW="container.md">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Container>
    </ChakraProvider>
  );
};

export default MyApp;
