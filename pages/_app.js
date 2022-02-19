import { ChakraProvider, Container } from '@chakra-ui/react';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Container maxW="container.md">
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  );
};

export default MyApp;
