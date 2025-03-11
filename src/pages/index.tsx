import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import { useColorMode } from '@docusaurus/theme-common';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function Avatar() {
  const { colorMode } = useColorMode();
  return (
    <img
      className={styles['avatar']}
      loading="lazy"
      srcSet={colorMode === 'dark' ? 'img/agent-dark.png' : 'img/agent.png'}
    />
  );
}

function DiscordIcon() {
  const path = 'img/discord-icon.svg#discord-icon'
  return (
    <svg
      className={styles['discord-icon']}
      viewBox='0 0 22.279521 17.139999'
    >
      <use xlinkHref={path} href={path} />
    </svg>
  );
}

function GithubIcon() {
  const path = 'img/github-icon.svg#github-icon'
  return (
    <svg
      className={styles['github-icon']}
      viewBox='0 0 16 16'
    >
      <use xlinkHref={path} href={path} />
    </svg>
  );
}

function YoutubeIcon() {
  const path = 'img/youtube-icon.svg#root'
  return (
    <svg
      className={styles['youtube-icon']}
      viewBox='0 0 43.101562 32'
    >
      <use xlinkHref={path} href={path} />
    </svg>
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
            {GithubIcon()}
          </Link>
          <Link
            className={styles['icon-container']}
            to={siteConfig.customFields.discordInviteUrl}
          >
            {DiscordIcon()}
          </Link>
          <Link
            className={styles['icon-container']}
            to={siteConfig.customFields.youtubeUrl}
          >
            {YoutubeIcon()}
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
      description="Сайт одного древнего компьютера с лапками."
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
