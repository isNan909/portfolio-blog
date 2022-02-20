import { ChakraProvider } from '@chakra-ui/react';
import Layoutdefault from '@/layouts/default';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Layoutdefault>
        <Component {...pageProps} />
      </Layoutdefault>
    </ChakraProvider>
  );
};

export default MyApp;
