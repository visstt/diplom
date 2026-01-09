import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  const position = [51.7667, 55.0986]; // Координаты Оренбурга, ул. Берёзка, 2/5

  return (
    <div className={styles.contactSection}>
      <div className="container">
        <div className={styles.contentWrapper}>
          <div className={styles.contactInfo}>
            <h2>Контакты</h2>
            <div className={styles.contactBlock}>
              <p className={styles.label}>ФАКТИЧЕСКИЙ АДРЕС</p>
              <h3>+7 (3532) 37-68-37</h3>
              <p>г. Оренбург, ул. Берёзка, 2/5</p>
            </div>
            <div className={styles.contactBlock}>
              <p className={styles.label}>ЛИНИЯ КОНСУЛЬТАЦИИ</p>
              <h3>+7 (3532) 37-62-43</h3>
            </div>
          </div>
          <div className={styles.mapContainer}>
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
        </div>
      </div>
    </div>
  );
}
