import { Container } from '@chakra-ui/react';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const Layoutdefault = ({ children }) => {
  return (
    <>
      <Container maxW="container.md">
        <Navbar />
        {children}
        <Footer />
      </Container>
    </>
  );
};

export default Layoutdefault;
