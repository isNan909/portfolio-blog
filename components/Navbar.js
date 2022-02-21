import { Box, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        py="8"
      >
        <Box fontWeight="bold" fontSize="lg">
          <NextLink href={'/'} passHref>
            <Link>
              <Box display="flex" alignItems="center">
                <Image
                  src="/avatar_me.png"
                  alt="my avatar"
                  width={30}
                  height={30}
                />
                <Box pl="1">Dylan</Box>
              </Box>
            </Link>
          </NextLink>
        </Box>
        <Box fontSize="sm" display="flex">
          <Box pr="6">
            <NextLink href={'/about'} passHref>
              <Link href={`/about`}>About</Link>
            </NextLink>
          </Box>

          <Box pr="6">
            <NextLink href={`/blogs`} passHref>
              <Link ml="2">Blog</Link>
            </NextLink>
          </Box>
          <Box>
            <NextLink href={`/cases`} passHref>
              <Link ml="2">Case Study</Link>
            </NextLink>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
