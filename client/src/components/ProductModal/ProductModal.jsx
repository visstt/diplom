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

            <div className={styles.versionSection}>
              <p className={styles.label}>Выберите версию</p>
              <div className={styles.versions}>
                <button className={styles.versionBtn}>Базовая</button>
                <button className={styles.versionBtn}>ПРОФ</button>
                <button className={styles.versionBtn}>КРОП</button>
              </div>
            </div>

            <p className={styles.price}>
              {product.price.toLocaleString("ru-RU")} ₽
            </p>

            <button className={styles.addToCartBtn}>Добавить в корзину</button>

            <div className={styles.features}>
              <div className={styles.feature}>
                <span className={styles.checkmark}>✓</span>
                <span>Строгое соответствие законодательству</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.checkmark}>✓</span>
                <span>Подходит юрлицам на УСН, ПСН, ОСНО</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.description}>
            <h3>Описание</h3>
            <p>
              Полный контроль финансовой деятельности компании: от операций с
              денежными средствами до расчета налогов и сдачи регламентированной
              отчетности. Продукт эффективен для малого бизнеса, так и для
              крупных предприятий.
            </p>
          </div>

          <div className={styles.functionality}>
            <h3>Функциональные возможности</h3>
            <ul>
              <li>Учет и отчетность</li>
              <li>Управление финансовыми ресурсами</li>
              <li>Работа с контрагентами</li>
              <li>Производственный учет</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
