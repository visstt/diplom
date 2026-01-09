import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.name} />
      <p>{product.name}</p>
      <h2>{product.price.toLocaleString("ru-RU")} ₽</h2>
    </div>
  );
}
