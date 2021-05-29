import styles from '@s/molecules/Header.module.scss';
import Link from 'next/link';
import Logo from '@c/atoms/Logo';

export default function Header() {
  return (
    <header className={styles.header}>
      <Logo />

      <nav className={styles['header--nav']}>
        <ul>
          <li><Link href="/#about"><a>About</a></Link></li>
          <li><Link href="/#games"><a>Games</a></Link></li>
        </ul>
      </nav>
    </header>
  );
}
