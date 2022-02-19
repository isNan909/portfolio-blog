import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSingleCase } from '@/lib/data';

const MyCase = ({ singleCase }) => {
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
          <span>Single Cases</span>
          <div>
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
      singleCase
    }
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true
  };
};
