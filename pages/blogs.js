import Head from 'next/head';
import Link from 'next/link';
import { getBlogs } from '@/lib/data';

import Footer from '@/components/footer';
import styles from '@/styles/Home.module.css';

const MyBlogs = ({ data }) => {
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
          {data?.blogs?.map((item, index) => (
            <Link key={index} href={`/blogs/${item.slug}`}>
              <a>
                <div>{item.title}</div>
              </a>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyBlogs;

export const getStaticProps = async () => {
  const data = await getBlogs();
  return {
    props: {
      data
    }
  };
};
