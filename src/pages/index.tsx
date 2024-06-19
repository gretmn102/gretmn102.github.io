import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function Avatar() {
  return (
    <img className={styles['avatar']} loading="lazy" srcSet="img/agent.png" />
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <div className={styles.card}>
      <div className={styles['card__avatar-container']}>
        {Avatar()}
      </div>
      <div className={styles['card__content']}>
        <div className={styles['content__header']}>
          <div className={styles['header__main']}>{siteConfig.title}</div>
          <div className={styles['header__tagline']}>{siteConfig.tagline}</div>
        </div>
        <div className={styles['content__avatar']}>
          {Avatar()}
        </div>
        <div className={styles['content__description']}>
          Любитель-погроммист, безызвестный поэт, горе-сценарист, разработчик простых игр и немного художник.
        </div>
        <div className={styles['content__footer']}>
          <Link
            className={styles['icon-container']}
            to={siteConfig.customFields.githubUrl}
          >
            <img className={styles['github-icon']} src="img/github-icon.svg" />
          </Link>
          <Link
            className={styles['icon-container']}
            to={siteConfig.customFields.discordInviteUrl}
          >
            <img className={styles['discord-icon']} src="img/discord-icon.svg" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Description will go into a meta tag in <head />"
    >
      <div className={styles['card-wrapper']}>
        <HomepageHeader />
      </div>
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
