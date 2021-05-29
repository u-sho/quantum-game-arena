import styles from '@s/pages/Home.module.scss';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.hero} id="top">
        <h1>Quantum Game Arena</h1>
      </header>
      <section className={styles.section} id="about">
        <h1>About</h1>
        <p>
          Quantum Game Arena
          は，ゲームを通じて量子力学的世界観を養うことを目的とした量子ゲームの遊び場です．
        </p>
      </section>
      <section className={styles.section} id="games">
        <h1>Games</h1>
        <nav>
          <ul className={styles['game-list']}>
            <li>
              <Link href="games/quantum-tictoctoe">
                <a type="text/html">量子三目並べ</a>
              </Link>
            </li>
            <li className={styles['coming-soon']}>
              <span>量子囲碁</span>
            </li>
            <li className={styles['coming-soon']}>
              <span>量子将棋</span>
            </li>
            <li className={styles['coming-soon']}>
              <span>量子人狼</span>
            </li>
          </ul>
        </nav>
      </section>
    </main>
  );
}
