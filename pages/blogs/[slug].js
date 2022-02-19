import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getSingleBlog, getBlogSlugs } from '@/lib/data';

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
          <Image
            src={singleBlog.blogs[0].bannerImage.url}
            width={singleBlog.blogs[0].bannerImage.width}
            height={singleBlog.blogs[0].bannerImage.height}
          />
          <div>{singleBlog.blogs[0].title}</div>
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
      singleBlog
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
