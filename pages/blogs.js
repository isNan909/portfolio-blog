import Head from 'next/head';
import NextLink from 'next/link';
import useSWR from 'swr';
import { request } from 'graphql-request';
import { api_endpoint } from '@/constants/index';
import { Button, Box, Stack, Link } from '@chakra-ui/react';

import styles from '@/styles/Home.module.css';
import { HiArrowNarrowRight, HiArrowNarrowLeft } from 'react-icons/hi';
import { useState } from 'react';

const fetcher = (endpoint, query, variables) =>
  request(endpoint, query, variables);

const MyBlogs = ({ blogs }) => {
  const [skip, setSkip] = useState(0);
  const { data, error } = useSWR(
    [
      api_endpoint,
      `    query getPaginatedBlog($skip: Int) {
        blogsConnection(orderBy: updatedAt_DESC, first: 5, skip: $skip) {
          edges {
            node {
              title
              date
              tags
              slug
              content
              bannerImage {
                url
              }
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            pageSize
          }
        }
      }
  `,
      skip
    ],
    (endpoint, query) => fetcher(endpoint, query, { skip }),
    { initialData: blogs, revalidateOnFocus: false }
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Personal Website | Blogs</title>
        <meta name="description" content="Personal Website | Blogs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <span>All Blogs</span>

          <Stack
            as={Box}
            textAlign={'left'}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 20, md: 36 }}
          >
            {data?.blogsConnection?.edges.map((item, index) => (
              <NextLink key={index} href={`/blogs/${item.node.slug}`} passHref>
                <Link>                <Box>
                  <Box
                    mt="1"
                    fontWeight="bold"
                    as="h4"
                    fontSize={'lg'}
                    lineHeight="tight"
                    isTruncated
                  >
                    {item.node.title}
                  </Box>

                  <Box fontSize={'sm'}>
                    {new Date(item.date).toDateString()}
                  </Box>
                </Box></Link>

              </NextLink>
            ))}
          </Stack>
        </div>
        <div>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Button
              leftIcon={<HiArrowNarrowLeft />}
              colorScheme="green"
              variant="outline"
              mr="2"
              disabled={!data?.blogsConnection?.pageInfo?.hasPreviousPage}
              onClick={() => {
                setSkip(skip - 5);
              }}
            >
              Previous
            </Button>
            <Button
              rightIcon={<HiArrowNarrowRight />}
              colorScheme="green"
              variant="outline"
              ml="2"
              disabled={!data?.blogsConnection?.pageInfo?.hasNextPage}
              onClick={() => {
                setSkip(skip + 5);
              }}
            >
              Next
            </Button>
          </Box>

          <Box mt={7}>Total Pages:{data?.blogsConnection.pageInfo.pageSize}</Box>
        </div>
        {error && <div>Failed to load</div>}
      </main>
    </div>
  );
};

export default MyBlogs;

export const getStaticProps = async () => {
  const data = await fetcher(
    api_endpoint,
    `
    query getPaginatedBlog {
      blogsConnection(orderBy: updatedAt_DESC, first: 5, skip: 0) {
        edges {
          node {
            title
            date
            tags
            slug
            content
            bannerImage {
              url
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          pageSize
        }
      }
    }
`
  );

  return {
    props: {
      blogs: data
    }
  };
};
