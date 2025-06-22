import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageMain}>
        <div className={styles.imageWrapper}>
          <img src="/assets/hero.jpg" alt="Hero" />
        </div>
      </div>
    </div>
  );
}
