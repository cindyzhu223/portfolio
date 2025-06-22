"use client";

import styles from "./page.module.css";
import React, { useState, useEffect } from "react";
import worksData from "../../../public/assets/works";

export default function Words() {
  const [expandedItem, setExpandedItem] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsClosing(true);
      setTimeout(() => {
        setExpandedItem(null);
        setIsClosing(false);
      }, 300);
    }
  };

  const handleScroll = () => {
    if (expandedItem && !isClosing) {
      setIsClosing(true);
      setTimeout(() => {
        setExpandedItem(null);
        setIsClosing(false);
      }, 300); // match your animation duration
    }
  };

  useEffect(() => {
    document.body.style.overflow = expandedItem ? "hidden" : "auto";

    if (expandedItem) {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [expandedItem, isClosing]);

  return (
    <div style={{ overflow: "auto" }}>
      <div className={styles.galleryContainer}>
        {worksData.map((item, id) => (
          <div
            key={id}
            className={styles.wrapper}
            onClick={() => {
              setExpandedItem(item);
              setIsClosing(false);
            }}
          >
            <div className={styles.imageWrapper}>
              <img
                src={item.imageUrl}
                alt={item.title}
                className={styles.galleryImage}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </div>
            <div className={styles.headerWrapper}>
              <h1 className={styles.title}>{item.title}</h1>
              <h1 className={styles.subtitle}>{item.subtitle}</h1>
            </div>
          </div>
        ))}
      </div>
      {expandedItem && (
        <div
          className={`${styles.expandedOverlay} ${
            isClosing ? styles.fadeOut : styles.fadeIn
          }`}
          onClick={() => {
            setIsClosing(true);
            setTimeout(() => {
              setExpandedItem(null);
              setIsClosing(false);
            }, 300);
          }} // match duration of fadeOut animation}}
        >
          <img
            src={expandedItem.imageUrl}
            alt={expandedItem.title}
            className={`${styles.expandedImage} ${
              isClosing ? styles.shrink : styles.scaleUp
            }`}
          />
          <div className={styles.expandedText}>
            <h1>{expandedItem.title}</h1>
            <p>{expandedItem.subtitle}</p>
          </div>
        </div>
      )}
    </div>
  );
}
