import Head from 'next/head';
import Image from 'next/image';
import he from 'he';
import hydrate from 'next-mdx-remote/hydrate';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { getSingleCase, getCaseSlugs } from '@/lib/data';
import renderToString from 'next-mdx-remote/render-to-string';
import { Box, Button, Heading, Link } from '@chakra-ui/react';
import { HiArrowNarrowLeft } from 'react-icons/hi';

const MyCase = ({ singleCase, content }) => {
  const router = useRouter();
  if (router.isFallback) return <>Loading...</>;
  return (
    <div>
      <Head>
        <title>Personal Website | A Case</title>
        <meta name="description" content="Personal Website | A Case" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <div>
            <Box>
              <NextLink href={`/cases`} passHref>
                <Link>
                  <Button leftIcon={<HiArrowNarrowLeft />}>Go back</Button>
                </Link>
              </NextLink>
            </Box>
            <Image
              src={singleCase.case_studies[0].bannerImage.url}
              width={singleCase.case_studies[0].bannerImage.width}
              height={singleCase.case_studies[0].bannerImage.height}
            />
            <Heading as="h3" mt="6">
              {singleCase.case_studies[0].title}
            </Heading>
            <br />
            {singleCase.case_studies[0].subheading}
            <Box pt="12">{hydrate(content)}</Box>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyCase;

export const getStaticProps = async ({ params }) => {
  const singleCase = await getSingleCase(params.slug);
  return {
    props: {
      singleCase,
      content: await renderToString(
        he.decode(singleCase.case_studies[0].content)
      )
    }
  };
};

export const getStaticPaths = async () => {
  const caseSlugs = await getCaseSlugs();
  const slugPaths = caseSlugs.case_studies.map(slug => ({
    params: { slug: slug.slug }
  }));
  return {
    paths: slugPaths,
    fallback: true
  };
};
