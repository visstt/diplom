import Button from "../Button/Button";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.logoSection}>
            <div className={styles.logoBlock}>
              <img src="/img/logo.svg" alt="logo" />
              <h2>ТИТАН</h2>
            </div>
            <div className={styles.contactInfo}>
              <p className={styles.label}>Адрес:</p>
              <p>г. Оренбург</p>
              <p>ул. Берёзка 2/5, 2 этаж</p>
              <p className={styles.phone}>Тел: +7 (3532) 37-68-37</p>
            </div>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.helpSection}>
            <h3>Нужна помощь?</h3>
            <p>
              Мы здесь, чтобы ответить на ваши вопросы.
              <br />
              Свяжитесь с нами удобным для вас способом,
              <br />и мы постараемся ответить как можно скорее.
            </p>
            <form className={styles.form}>
              <Button type="submit">Написать</Button>
            </form>
          </div>
          <div className={styles.divider}></div>

          <div className={styles.navSection}>
            <a href="/">Каталог</a>
            <a href="/">Услуги</a>
            <a href="/">О нас</a>
            <a href="/">Контакты</a>
            <a href="/">Политика конфиденциальности</a>
          </div>
        </div>

        <div className={styles.copyright}>
          © ООО «Титан» ОГРН 1165835070983 ИНН 5836679828
        </div>
      </div>
    </footer>
  );
}
