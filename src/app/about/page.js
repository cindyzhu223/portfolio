import styles from "./page.module.css";

export default function About() {
  return (
    <main className={styles.container}>
      <section className={styles.content}>
        <p className={styles.paragraph}>
          I&apos;m currently a{" "}
          <span className={styles.accent}>medical student</span> at Tufts.
          I&apos;ve always loved making art as a creative outlet. My style leans
          cartoonish and playful. Many of my works were gifts—featuring my
          friends&apos; favorite TV shows, characters, and pop culture
          references.
        </p>
        <p className={styles.paragraph}>
          Lately, I&apos;ve been exploring graphic and digital art using my
          iPad, though I still enjoy working with acrylics. My inspirations
          range from the vibrant, food-inspired works of Gopal Dagnogo to the
          thoughtful designs of Angela Wei.
        </p>
        <p className={styles.paragraph}>
          When I&apos;m not making art, I enjoy going to the gym, cooking with
          my boyfriend, listening to Bad Bunny, and tuning into Stephanie
          Soo&apos;s podcast. Through my art, I hope to spark laughter,
          lightness, and a little absurdity. You can reach me at{" "}
          <span className={styles.accent}>sindeezoo@gmail.com</span>
        </p>
      </section>
    </main>
  );
}
