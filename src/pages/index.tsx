import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

type IconProps = React.ComponentProps<'svg'>;

function ServerIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  );
}

function BookIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path d="M12 7v14" />
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
    </svg>
  );
}

function LinkIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

function MailIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

type MirrorLink = {label: string; to: string; icon: string};

const MIRROR_LINKS: MirrorLink[] = [
  {label: 'Ubuntu', to: '/docs/mirrors/ubuntu-help', icon: '/help/img/mirrors/ubuntu.svg'},
  {label: 'Debian', to: '/docs/mirrors/debian-help', icon: '/help/img/mirrors/debian.svg'},
  {label: 'CentOS', to: '/docs/mirrors/centos-help', icon: '/help/img/mirrors/centos.svg'},
  {label: 'Arch Linux', to: '/docs/mirrors/archlinux-help', icon: '/help/img/mirrors/archlinux.svg'},
  {label: 'Manjaro', to: '/docs/mirrors/manjaro-help', icon: '/help/img/mirrors/manjaro.svg'},
  {label: 'Fedora', to: '/docs/mirrors/fedora-help', icon: '/help/img/mirrors/fedora.svg'},
  {label: 'PyPI', to: '/docs/mirrors/pypi-help', icon: '/help/img/mirrors/pypi.svg'},
  {label: 'Docker', to: '/docs/mirrors/docker-help', icon: '/help/img/mirrors/docker.svg'},
  {label: 'Homebrew', to: '/docs/mirrors/homebrew-help', icon: '/help/img/mirrors/homebrew.svg'},
  {label: 'npm', to: '/docs/mirrors/npm-help', icon: '/help/img/mirrors/npm.svg'},
  {label: 'Maven', to: '/docs/mirrors/maven-help', icon: '/help/img/mirrors/maven.svg'},
  {label: 'Go', to: '/docs/mirrors/go-help', icon: '/help/img/mirrors/go.svg'},
  {label: 'Rust', to: '/docs/mirrors/crates.io-index-help', icon: '/help/img/mirrors/rust.svg'},
  {label: 'Kubernetes', to: '/docs/mirrors/kubernetes-help', icon: '/help/img/mirrors/kubernetes.svg'},
  {label: 'Kali', to: '/docs/mirrors/kali-help', icon: '/help/img/mirrors/kali.svg'},
  {label: 'FreeBSD', to: '/docs/mirrors/freebsd-help', icon: '/help/img/mirrors/freebsd.svg'},
  {label: 'openSUSE', to: '/docs/mirrors/opensuse-help', icon: '/help/img/mirrors/opensuse.svg'},
  {label: 'Gentoo', to: '/docs/mirrors/gentoo-help', icon: '/help/img/mirrors/gentoo.svg'},
  {label: 'Anolis', to: '/docs/mirrors/anolis-help', icon: '/help/img/mirrors/anolis.png'},
  {label: 'OpenEuler', to: '/docs/mirrors/openeuler-help', icon: '/help/img/mirrors/openeuler.svg'},
];

type SidebarLink = {label: string; to?: string; href?: string};

const QUICK_LINKS: SidebarLink[] = [
  {label: '关于我们', to: '/docs/intro'},
  {label: '常见问题', to: '/docs/intro'},
  {label: '镜像站主页', href: 'https://mirrors.gdut.edu.cn'},
];

const RELATED_LINKS: SidebarLink[] = [
  {label: '广东工业大学首页', href: 'https://www.gdut.edu.cn/'},
  {label: '镜像站状态', href: 'https://mirrors.gdut.edu.cn/status.html'},
  {label: '容器镜像库', href: 'https://registry.gdut.edu.cn/'},
  {label: '校内测速', href: 'https://speed.gdut.edu.cn'},
  {label: 'GitHub', href: 'https://github.com/chn-lee-yumi/mirrors-gdut'},
];

function Hero({title}: {title: string}): ReactNode {
  return (
    <header className={styles.hero}>
      <img src="/help/img/logo.png" alt="GDUT Logo" className={styles.heroLogo} />
      <h1 className={styles.heroTitle}>{title}</h1>
      <div className={styles.buttons}>
        <Link
          className="button button--primary button--lg"
          to="/docs/intro">
          查看文档
        </Link>
        <Link
          className="button button--primary button--outline button--lg"
          href="https://mirrors.gdut.edu.cn">
          镜像站主页
        </Link>
      </div>
    </header>
  );
}

function SidebarIsland({
  icon,
  title,
  links,
}: {
  icon: ReactNode;
  title: string;
  links: SidebarLink[];
}): ReactNode {
  return (
    <div className={clsx(styles.island, styles.islandCompact)}>
      <div className={styles.islandHeader}>
        {icon}
        <h2 className={styles.islandTitle}>{title}</h2>
      </div>
      <ul className={styles.linkList}>
        {links.map((link) => (
          <li key={link.label} className={styles.linkListItem}>
            {link.to ? (
              <Link to={link.to} className={styles.linkItem}>
                {link.label}
              </Link>
            ) : (
              <Link href={link.href} className={styles.linkItem}>
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description="广东工业大学开源镜像站帮助文档">
      <Hero title={siteConfig.title} />
      <main className={styles.mainContainer}>
        <div className={styles.bentoGrid}>
          <section className={styles.bentoMain}>
            <div className={styles.island}>
              <div className={styles.islandHeader}>
                <ServerIcon className={styles.islandIcon} />
                <h2 className={styles.islandTitle}>热门镜像使用帮助</h2>
              </div>
              <div className={styles.mirrorGrid}>
                {MIRROR_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={styles.mirrorCard}>
                    <img src={link.icon} alt={link.label} className={styles.mirrorIcon} />
                    <span className={styles.mirrorName}>{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
          <aside className={styles.bentoSidebar}>
            <SidebarIsland
              icon={<BookIcon className={styles.islandIcon} />}
              title="快速入口"
              links={QUICK_LINKS}
            />
            <SidebarIsland
              icon={<LinkIcon className={styles.islandIcon} />}
              title="相关链接"
              links={RELATED_LINKS}
            />
            <div className={clsx(styles.island, styles.islandCompact)}>
              <div className={styles.islandHeader}>
                <MailIcon className={styles.islandIcon} />
                <h2 className={styles.islandTitle}>联系我们</h2>
              </div>
              <ul className={styles.linkList}>
                <li className={styles.linkListItem}>
                  <Link
                    href="mailto:stunic@gdut.edu.cn"
                    className={styles.linkItem}>
                    stunic@gdut.edu.cn
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </Layout>
  );
}
