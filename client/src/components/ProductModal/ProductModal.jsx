import { useEffect } from "react";
import styles from "./ProductModal.module.css";

export default function ProductModal({ product, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>

        <div className={styles.content}>
          <div className={styles.leftSection}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
            />
          </div>

          <div className={styles.rightSection}>
            <h2 className={styles.title}>{product.name}</h2>

            {product.category && (
              <p className={styles.category}>{product.category}</p>
            )}

            <p className={styles.price}>
              {product.price.toLocaleString("ru-RU")} ₽
            </p>

            <button className={styles.addToCartBtn}>Добавить в корзину</button>

            {product.benefits && product.benefits.length > 0 && (
              <div className={styles.features}>
                {product.benefits.map((benefit, index) => (
                  <div key={index} className={styles.feature}>
                    <span className={styles.checkmark}>✓</span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.bottomSection}>
          {product.description && (
            <div className={styles.description}>
              <h3>Описание</h3>
              <p>{product.description}</p>
            </div>
          )}

          {product.features && product.features.length > 0 && (
            <div className={styles.functionality}>
              <h3>Функциональные возможности</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
