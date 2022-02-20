import he from 'he';
import Head from 'next/head';
import Image from 'next/image';
import hydrate from 'next-mdx-remote/hydrate';
import { useRouter } from 'next/router';
import { getSingleBlog, getBlogSlugs } from '@/lib/data';
import renderToString from 'next-mdx-remote/render-to-string';

import { Stack, Box } from '@chakra-ui/react';
import '@/styles/Blogdetail.module.css';

const MyBlog = ({ singleBlog, content }) => {
  const router = useRouter();
  if (router.isFallback) return <>Loading...</>;

  return (
    <div>
      <Head>
        <title>Personal Website | A Blog</title>
        <meta name="description" content="Personal Website | A Blog" />
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.3.2/build/styles/default.min.css"
        ></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Stack
          as={Box}
          textAlign={'left'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 36 }}
        >
          <Image
            src={singleBlog.blogs[0].bannerImage.url}
            width={singleBlog.blogs[0].bannerImage.width}
            height={singleBlog.blogs[0].bannerImage.height}
          />
          <Box>
            <Box
              mt="1"
              fontWeight="bold"
              as="h4"
              fontSize={'3xl'}
              lineHeight="tight"
              isTruncated
            >
              {singleBlog.blogs[0].title}
            </Box>

            <Box fontSize={'sm'}>
              {new Date(singleBlog.blogs[0].date).toDateString()}
            </Box>
          </Box>

          <Box>{hydrate(content)}</Box>
        </Stack>
      </main>
    </div>
  );
};

export default MyBlog;

export const getStaticProps = async ({ params }) => {
  const singleBlog = await getSingleBlog(params.slug);
  return {
    props: {
      singleBlog,
      content: await renderToString(he.decode(singleBlog.blogs[0].content))
    }
  };
};

export const getStaticPaths = async () => {
  const blogSlugs = await getBlogSlugs();
  const slugPaths = blogSlugs.blogs.map(slug => ({
    params: { slug: slug.slug }
  }));
  return {
    paths: slugPaths,
    fallback: true
  };
};
