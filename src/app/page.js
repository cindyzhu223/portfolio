"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

const image = "/home.jpg";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.name}>
          <div className={styles.conceptGrid}>
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={`${styles.hover} ${styles[`hover-${i + 1}`]}`}
              />
            ))}
            <h1>
              <Link href="/">Cindy Zhu</Link>
            </h1>
          </div>
        </div>
        <nav className={styles.nav}>
          <Link href="/works">Works</Link>
          <Link href="/about">About</Link>
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.imageWrapper}>
          <img src={image} alt="temp" />
        </div>
      </main>
    </div>
  );
}
