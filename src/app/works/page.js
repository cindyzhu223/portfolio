"use client";

import styles from "./page.module.css";
import React, { useState, useEffect } from "react";
import worksData from "../../../public/assets/works";
import { FaTh, FaList } from "react-icons/fa";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function Works() {
  const [expandedItem, setExpandedItem] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isGalleryView, setIsGalleryView] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const [isSwiping, setIsSwiping] = useState(false);

  // Minimum swipe distance threshold
  const minSwipeDistance = 50;

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (isSwiping || touchStartX === null || touchEndX === null) return;

    const distance = touchStartX - touchEndX;

    if (Math.abs(distance) > minSwipeDistance) {
      setIsSwiping(true); // start cooldown

      if (distance > 0) {
        // Swipe left → next
        setCurrentImageIndex(
          (prev) => (prev + 1) % expandedItem.imageUrls.length
        );
      } else {
        // Swipe right → previous
        setCurrentImageIndex(
          (prev) =>
            (prev - 1 + expandedItem.imageUrls.length) %
            expandedItem.imageUrls.length
        );
      }

      // Set a cooldown timer (e.g., 300ms)
      setTimeout(() => {
        setIsSwiping(false);
      }, 300);
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
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
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
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
              setCurrentImageIndex(0);
            }}
          >
            <div
              className={`${styles.imageWrapper} ${
                isGalleryView ? styles.gridImageWrapper : ""
              }`}
            >
              <img
                src={item.imageUrls?.[0]}
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
          <div
            className={styles.expandedOverlayContent}
            onClick={(e) => e.stopPropagation()}
          >
            {expandedItem.imageUrls?.length > 1 && (
              <div
                className={styles.arrowLeft}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(
                    (prev) =>
                      (prev - 1 + expandedItem.imageUrls.length) %
                      expandedItem.imageUrls.length
                  );
                }}
              >
                <MdChevronLeft />
              </div>
            )}

            <div
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={expandedItem.imageUrls?.[currentImageIndex]}
                alt={expandedItem.title}
                className={`${styles.expandedImage} ${
                  isClosing ? styles.shrink : styles.scaleUp
                }`}
              />
            </div>

            {expandedItem.imageUrls?.length > 1 && (
              <div
                className={styles.arrowRight}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(
                    (prev) => (prev + 1) % expandedItem.imageUrls.length
                  );
                }}
              >
                <MdChevronRight />
              </div>
            )}

            {expandedItem.imageUrls?.length > 1 && (
              <div className={styles.paginationDots}>
                {expandedItem.imageUrls.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.dot} ${
                      index === currentImageIndex ? styles.activeDot : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}

            <div className={styles.expandedText}>
              <h1>{expandedItem.title}</h1>
              <p>{expandedItem.subtitle}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
