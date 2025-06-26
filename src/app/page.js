import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageMain}>
        <div className={styles.imageWrapper}>
          <picture>
            <source
              media="(max-width: 480px)"
              srcSet="/assets/hero/hero-mobile.png"
            />
            <img src="/assets/hero/hero.jpg" alt="Hero" />
          </picture>
        </div>
      </div>
    </div>
  );
}
