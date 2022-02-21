import Head from 'next/head';
import NextLink from 'next/link';
import Image from 'next/image';
import { getCases } from '@/lib/data';

import styles from '@/styles/Home.module.css';
import { Box, Link, Stack, Heading, Text } from '@chakra-ui/react';

const MyCases = ({ cases }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Personal Website | Cases</title>
        <meta name="description" content="Personal Website | Cases" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <Heading as="h3" mt="6">
            Case Studies
          </Heading>
          {cases?.case_studies?.map((item, index) => (
            <Box key={index}>
              <Stack
                as={Box}
                textAlign={'left'}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 20, md: 36 }}
              >
                <NextLink href={`/cases/${item.slug}`} passHref>
                  <Link>
                    <Box
                      marginTop={{ base: '1', sm: '5' }}
                      display="flex"
                      flexDirection={{ base: 'column', sm: 'row' }}
                      justifyContent="space-between"
                    >
                      <Box
                        display="flex"
                        flex="1"
                        marginRight="3"
                        position="relative"
                        alignItems="center"
                      >
                        <Box
                          width={{ base: '100%', sm: '85%' }}
                          zIndex="2"
                          marginLeft={{ base: '0', sm: '5%' }}
                          marginTop="5%"
                        >
                          <Image
                            src={item.bannerImage.url}
                            width={item.bannerImage.width}
                            height={item.bannerImage.height}
                            alt="some good alt text"
                            objectFit="contain"
                          />
                        </Box>
                        <Box
                          zIndex="1"
                          width="100%"
                          position="absolute"
                          height="100%"
                        >
                          <Box
                            color={'gray.500'}
                            backgroundSize="20px 20px"
                            opacity="0.4"
                            height="100%"
                          />
                        </Box>
                      </Box>
                      <Box
                        display="flex"
                        flex="1"
                        flexDirection="column"
                        justifyContent="center"
                        marginTop={{ base: '3', sm: '0' }}
                      >
                        <Heading marginTop="1">{item.title}</Heading>
                        <Text
                          as="p"
                          marginTop="2"
                          color={'gray.500'}
                          fontSize="lg"
                        >
                          {item.subheading}
                        </Text>
                      </Box>
                    </Box>
                  </Link>
                </NextLink>
              </Stack>
            </Box>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MyCases;

export const getStaticProps = async () => {
  const data = await getCases();
  return {
    props: {
      cases: data
    }
  };
};
