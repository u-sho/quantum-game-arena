import styles from '@s/pages/games/quantum-tictoctoe/Index.module.scss';
import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <h1>Quantum Tic-Toc-Toe</h1>
      <ul className={styles.nav}>
        <li>
          <Link href="/games/quantum-tictoctoe/play/human">
            <a
              className={styles.btn}
              type="application/ecmascript">オフライン対局</a
            >
          </Link>
        </li>
        <li className={styles['coming-soon']}>
          <span className={styles.btn}>オンライン対局</span>
        </li>
      </ul>
    </>
  );
}
