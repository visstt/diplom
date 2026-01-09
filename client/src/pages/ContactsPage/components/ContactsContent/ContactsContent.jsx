import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Button from "../../../../components/Button/Button";
import styles from "./ContactsContent.module.css";

export default function ContactsContent() {
  const position = [51.7667, 55.0986];

  return (
    <div className={styles.contactsContent}>
      <div className="container">
        <div className={styles.breadcrumbs}>
          <Link to="/">Главная</Link>
          <span> &gt; </span>
          <span className={styles.active}>Контакты</span>
        </div>

        <h1 className={styles.title}>Контакты</h1>

        <div className={styles.mapWrapper}>
          <MapContainer
            center={position}
            zoom={15}
            scrollWheelZoom={true}
            className={styles.map}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            <Marker position={position}>
              <Popup>
                ООО «ТИТАН»
                <br />
                г. Оренбург, ул. Берёзка, 2/5
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.contactInfo}>
            <div className={styles.infoBlock}>
              <p className={styles.label}>ФАКТИЧЕСКИЙ АДРЕС</p>
              <p className={styles.text}>г. Оренбург, ул. Берёзка, 2/5</p>
            </div>

            <div className={styles.infoBlock}>
              <p className={styles.label}>ТЕЛЕФОНЫ</p>
              <p className={styles.text}>+7 (3532) 37-62-43</p>
              <p className={styles.text}>+7 (3532) 37-68-37</p>
            </div>

            <div className={styles.infoBlock}>
              <p className={styles.label}>EMAIL</p>
              <p className={styles.text}>info@titan.ru</p>
            </div>

            <div className={styles.infoBlock}>
              <p className={styles.label}>РЕЖИМ РАБОТЫ</p>
              <p className={styles.text}>Пн-пт: с 9:00 до 19:00</p>
              <p className={styles.text}>Сб-вс: выходной</p>
            </div>
          </div>

          <div className={styles.formSection}>
            <p className={styles.description}>
              ООО "Титан" создает полезные для бизнеса решения, будучи настоящим
              партнером - мы строим честные отношения и профессионально подходим
              к каждой задаче. Стремясь быть лучшими и первыми, мы предлагаем
              индивидуальные подходы для достижения ваших амбициозных целей.
              Получите замечательное от решения результаты совместной работы.
            </p>

            <h2 className={styles.formTitle}>Обратная связь</h2>

            <form className={styles.form}>
              <div className={styles.formGrid}>
                <textarea
                  className={styles.textarea}
                  placeholder="Сообщение"
                  rows="4"
                ></textarea>
                <input type="text" className={styles.input} placeholder="Имя" />
              </div>

              <input
                type="email"
                className={styles.input}
                placeholder="Email"
              />
              <input
                type="tel"
                className={styles.input}
                placeholder="Телефон"
              />

              <div className={styles.checkboxWrapper}>
                <input
                  type="checkbox"
                  id="agreement"
                  className={styles.checkbox}
                />
                <label htmlFor="agreement" className={styles.checkboxLabel}>
                  Я даю согласие на обработку моих персональных данных и
                  соглашаюсь с Политикой конфиденциальности
                </label>
              </div>

              <Button type="submit">Отправить</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
