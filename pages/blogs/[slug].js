import he from 'he';
import Head from 'next/head';
import Image from 'next/image';
import NextLink from 'next/link';
import hydrate from 'next-mdx-remote/hydrate';
import { useRouter } from 'next/router';
import { getSingleBlog, getBlogSlugs } from '@/lib/data';
import renderToString from 'next-mdx-remote/render-to-string';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { Box, Button, Heading, Link } from '@chakra-ui/react';

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
        <div>
          <NextLink href={`/blogs`} passHref>
            <Link>
              <Button leftIcon={<HiArrowNarrowLeft />}>Go back</Button>
            </Link>
          </NextLink>
          <Image
            src={singleBlog.blogs[0].bannerImage.url}
            width={singleBlog.blogs[0].bannerImage.width}
            height={singleBlog.blogs[0].bannerImage.height}
          />
          <Heading as="h3" mt="6">
            {singleBlog.blogs[0].title}
          </Heading>

          <Box my="5" fontWeight="bold">
            {new Date(singleBlog.blogs[0].date).toDateString()}
          </Box>
          <Box mt="6"> {hydrate(content)}</Box>
          <small>
            {singleBlog.blogs[0].tags.map((item, index) => (
              <div key={index}>
                <span>{item}</span>
              </div>
            ))}
          </small>
        </div>
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
