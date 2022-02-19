import Head from 'next/head';
import Link from 'next/link';
import { getCases } from '@/lib/data';

import Footer from '@/components/footer';
import styles from '@/styles/Home.module.css';

const MyCases = ({ data }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Personal Website | Cases</title>
        <meta name="description" content="Personal Website | Cases" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <span>All Cases</span>
          {data?.case_studies?.map((item, index) => (
            <div key={index}>
              <Link href={`/cases/${item.slug}`}>
                <a>
                  <div>
                    {item.title}
                    {item.subheading}
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyCases;

export const getStaticProps = async () => {
  const data = await getCases();
  return {
    props: {
      data
    }
  };
};
