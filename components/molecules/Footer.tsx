import styles from '@s/molecules/Footer.module.scss';
import Logo from '@c/atoms/Logo';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Logo />
      twitter
    </footer>
  );
}
