import styles from "./OrderSuccessModal.module.css";

export default function OrderSuccessModal({ isOpen, onClose, orderData }) {
  if (!isOpen) return null;

  const currentDate = new Date().toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h1 className={styles.title}>Спасибо! Ваш заказ успешно оформлен.</h1>

        <div className={styles.orderInfoBlock}>
          <div className={styles.infoRow}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Номер заказа:</span>
              <span className={styles.value}>#{orderData.orderId}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Дата:</span>
              <span className={styles.value}>{currentDate}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Итого:</span>
              <span className={styles.value}>
                {orderData.total.toLocaleString("ru-RU")} ₽
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Способ оплаты:</span>
              <span className={styles.value}>Оплата картой на сайте</span>
            </div>
          </div>
        </div>

        <h2 className={styles.sectionTitle}>Детали заказа:</h2>

        <div className={styles.detailsBlock}>
          <h3 className={styles.blockTitle}>Итого</h3>

          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Сумма:</span>
            <span className={styles.detailValue}>
              {orderData.total.toLocaleString("ru-RU")} ₽
            </span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Способ оплаты:</span>
            <span className={styles.detailValue}>Оплата картой на сайте</span>
          </div>

          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>Итого:</span>
            <span className={styles.totalValue}>
              {orderData.total.toLocaleString("ru-RU")} ₽
            </span>
          </div>
        </div>

        <div className={styles.contactBlock}>
          <span className={styles.contactName}>{orderData.name}</span>
          <div className={styles.contactInfo}>
            <span className={styles.contactLabel}>Телефон</span>
            <span className={styles.contactValue}>{orderData.phone}</span>
          </div>
          <div className={styles.contactInfo}>
            <span className={styles.contactLabel}>Email</span>
            <span className={styles.contactValue}>{orderData.email}</span>
          </div>
        </div>

        <button className={styles.closeButton} onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
}
