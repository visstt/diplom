import styles from "./ProductCard.module.css";

export default function ProductCard({ image, title, price }) {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} />
      <p>{title}</p>
      <h2>{price}</h2>
    </div>
  );
}
