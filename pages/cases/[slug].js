import he from 'he';
import Head from 'next/head';
import Image from 'next/image';
import hydrate from 'next-mdx-remote/hydrate';
import { useRouter } from 'next/router';
import { getSingleCase, getCaseSlugs } from '@/lib/data';
import renderToString from 'next-mdx-remote/render-to-string';

const MyCase = ({ singleCase, content }) => {
  const router = useRouter();
  if (router.isFallback) return <>Loading...</>;
  // console.log(singleCase);
  return (
    <div>
      <Head>
        <title>Personal Website | A Case</title>
        <meta name="description" content="Personal Website | A Case" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <span>Single Cases</span>
          <div>
            <Image
              src={singleCase.case_studies[0].bannerImage.url}
              width={singleCase.case_studies[0].bannerImage.width}
              height={singleCase.case_studies[0].bannerImage.height}
            />
            <div>{hydrate(content)}</div>
            {singleCase.case_studies[0].title}
            {singleCase.case_studies[0].subheading}
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
