import Header from "../../../../components/Header/Header";
import styles from "./MainSection.module.css";

export default function MainSection() {
  return (
    <>
      <Header />
      <div className={styles.mainSection}>
        <div className="container">
          <img className={styles.background} src="/img/logo.svg" alt="logo" />
          <h1 className={styles.title}>
            Готовые 1C решения для вашего бизнеса
          </h1>
          <p className={styles.subtitle}>
            Мы делаем бизнес клиента сильнее и создаем возможности для успешного
            развития с помощью IT-технологий
          </p>
          <button className={styles.button}>Перейти к покупкам</button>
        </div>
      </div>
    </>
  );
}
