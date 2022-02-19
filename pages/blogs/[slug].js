import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSingleBlog } from '@/lib/data';

const MyBlog = ({ singleBlog }) => {
  const router = useRouter();
  if (router.isFallback) return <>Loading...</>;
  return (
    <div>
      <Head>
        <title>Personal Website | A Blog</title>
        <meta name="description" content="Personal Website | A Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <span>Single Blog</span>
          <div>{singleBlog.blogs[0].title}</div>
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
      singleBlog
    }
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true
  };
};
