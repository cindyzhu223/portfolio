import styles from "./page.module.css";

export default function About() {
  return (
    <main className={styles.container}>
      <section className={styles.content}>
        <p className={styles.paragraph}>
          Welcome to our portfolio! We are passionate creators dedicated to
          bringing <span className={styles.accent}>modern design</span> and
          intuitive user experiences together.
        </p>
        <p className={styles.paragraph}>
          Our team combines <span className={styles.accent}>cutting-edge</span>{" "}
          technology with a deep understanding of aesthetics to build digital
          products that truly resonate with users.
        </p>
        <p className={styles.paragraph}>
          Whether it’s crafting sleek interfaces or developing robust backends,
          we ensure every line of code and every pixel is intentional and
          polished.
        </p>
      </section>
    </main>
  );
}
