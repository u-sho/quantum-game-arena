import styles from '@s/atoms/Logo.module.scss'
import Link from 'next/link'

export default function Logo() {
  return (
  <hgroup className={styles.logo}>
    <Link href="/">
      <a>
        <img src="logo-144x144.png" alt="Quantum Game Arena" />
        <h1>Quantum Game Arena</h1>
      </a>
    </Link>
  </hgroup>
);
  }
