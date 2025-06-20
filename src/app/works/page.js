import styles from "./page.module.css";
import React from "react";
import worksData from "../../../public/assets/works";

export default function Words() {
  return (
    <div className={styles.galleryContainer}>
      {worksData.map((item) => (
        <div key={item.id} className={styles.wrapper}>
          <div className={styles.imageWrapper}>
            <img
              src={item.imageUrl}
              alt={item.title}
              width={450}
              height={300}
              className={styles.galleryImage}
              // style={{ objectPosition: item.objectPosition }}
            />
          </div>
          <div className={styles.headerWrapper}>
            <h1 className={styles.title}>{item.title}</h1>
            <h1 className={styles.title}>See Project</h1>
          </div>
        </div>
      ))}
    </div>
  );
}
