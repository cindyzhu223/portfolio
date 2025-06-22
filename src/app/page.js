import styles from "./page.module.css";

const image = "/assets/hero.jpg";

export default function HomePage() {
  return (
    <div className={styles.container}>
      {/* Main Visual Area */}
      <main className={styles.main}>
        <div className={styles.imageWrapper}>
          <img src={image} alt="Hero" />
        </div>
      </main>
    </div>
  );
}
