import Head from 'next/head';
import Link from 'next/link';
import { request } from 'graphql-request';
import useSWR from 'swr';
import { api_endpoint } from '@/constants/index';
import { Button, Box } from '@chakra-ui/react';

import Footer from '@/components/footer';
import styles from '@/styles/Home.module.css';
import { HiArrowNarrowRight, HiArrowNarrowLeft } from 'react-icons/hi';
import { useState } from 'react';

const fetchData = (endpoint, query, variables) =>
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
    (endpoint, query) => fetchData(endpoint, query, { skip }),
    { initialData: blogs, revalidateOnFocus: true }
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
          {data?.blogsConnection?.edges.map((item, index) => (
            <Link key={index} href={`/blogs/${item.node.slug}`}>
              <a>
                <div>{item.node.title}</div>
              </a>
            </Link>
          ))}
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

          <div>Total Pages:{data?.blogsConnection.pageInfo.pageSize}</div>
        </div>
        {error && <div>Failed to load</div>}
      </main>
      <Footer />
    </div>
  );
};

export default MyBlogs;

export const getStaticProps = async () => {
  const data = await fetchData(
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
