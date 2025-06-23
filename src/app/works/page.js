"use client";

import styles from "./page.module.css";
import React, { useState, useEffect } from "react";
import worksData from "../../../public/assets/works";
import { FaTh, FaList } from "react-icons/fa";

export default function Works() {
  const [expandedItem, setExpandedItem] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isGalleryView, setIsGalleryView] = useState(false);

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
      }, 300);
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
    <div className={styles.layoutContainer}>
      <div className={styles.viewToggleContainer}>
        <button
          onClick={() => setIsGalleryView(!isGalleryView)}
          className={styles.toggleButton}
          aria-label={
            isGalleryView ? "Switch to list view" : "Switch to gallery view"
          }
        >
          {isGalleryView ? <FaList size={20} /> : <FaTh size={20} />}
        </button>
      </div>

      <div
        className={`${styles.galleryContainer} ${
          isGalleryView ? styles.gridView : ""
        }`}
      >
        {worksData.map((item, id) => (
          <div
            key={id}
            className={`${styles.wrapper} ${
              isGalleryView ? styles.gridItem : ""
            }`}
            onClick={() => {
              setExpandedItem(item);
              setIsClosing(false);
            }}
          >
            <div
              className={`${styles.imageWrapper} ${
                isGalleryView ? styles.gridImageWrapper : ""
              }`}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className={`${styles.galleryImage} ${
                  isGalleryView ? styles.gridImage : ""
                }`}
              />
            </div>
            {!isGalleryView && (
              <div className={styles.headerWrapper}>
                <h1 className={styles.title}>{item.title}</h1>
                <h1 className={styles.subtitle}>{item.subtitle}</h1>
              </div>
            )}
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
          }}
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
