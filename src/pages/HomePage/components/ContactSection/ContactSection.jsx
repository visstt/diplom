import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styles from "./ContactSection.module.css";

// Создаем кастомный маркер в виде синей капли
const customIcon = L.divIcon({
  className: "custom-marker",
  html: `
    <div style="position: relative; width: 60px; height: 60px;">
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 5C20 5 12 13 12 23C12 33 30 55 30 55C30 55 48 33 48 23C48 13 40 5 30 5Z" 
              fill="#1E88E5" stroke="white" stroke-width="3"/>
      </svg>
    </div>
  `,
  iconSize: [60, 60],
  iconAnchor: [30, 55],
  popupAnchor: [0, -55],
});

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
              scrollWheelZoom={false}
              className={styles.map}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position} icon={customIcon}>
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
