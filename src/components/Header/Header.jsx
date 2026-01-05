import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <div className="container">
      {isMenuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
      <div className={styles.header}>
        <div className={styles.logo_section}>
          <img src="/img/logo.svg" alt="logo" />
          <h1>Титан</h1>
        </div>

        <button
          className={styles.burgerButton}
          onClick={toggleMenu}
          aria-label="Меню"
        >
          <span className={isMenuOpen ? styles.burgerOpen : ""}></span>
          <span className={isMenuOpen ? styles.burgerOpen : ""}></span>
          <span className={isMenuOpen ? styles.burgerOpen : ""}></span>
        </button>

        <div
          className={`${styles.navbar} ${isMenuOpen ? styles.navbarOpen : ""}`}
        >
          <div className={styles.nav_section}>
            <a href="/" onClick={() => setIsMenuOpen(false)}>
              Каталог
            </a>
            <a href="/" onClick={() => setIsMenuOpen(false)}>
              Услуги
            </a>
            <a href="/" onClick={() => setIsMenuOpen(false)}>
              О нас
            </a>
            <a href="/" onClick={() => setIsMenuOpen(false)}>
              Контакты
            </a>
          </div>

          <div className={styles.icons_section}>
            <img src="/img/people.svg" alt="people" />
            <img src="/img/cart.svg" alt="cart" />
          </div>
        </div>
      </div>
      <div className={styles.stripe}></div>
    </div>
  );
}
