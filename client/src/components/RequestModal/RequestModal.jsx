import { useState, useEffect } from "react";
import styles from "./RequestModal.module.css";

export default function RequestModal({ isOpen, onClose, serviceName }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setFormData({ name: "", phone: "", email: "", comment: "" });
      setSubmitStatus(null);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("http://localhost:3001/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          serviceName,
        }),
      });

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Заявка успешно отправлена!",
        });
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setSubmitStatus({ type: "error", message: "Ошибка отправки заявки" });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Не удалось отправить заявку. Попробуйте позже.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>

        <h2 className={styles.title}>Заявка на услугу</h2>
        <p className={styles.serviceName}>{serviceName}</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Ваше имя <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              placeholder="Иван Иванов"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              Телефон <span className={styles.required}>*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={styles.input}
              placeholder="+7 (999) 123-45-67"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="example@mail.com"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="comment" className={styles.label}>
              Комментарий
            </label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              className={styles.textarea}
              placeholder="Дополнительная информация..."
              rows="4"
            />
          </div>

          {submitStatus && (
            <div
              className={`${styles.status} ${
                submitStatus.type === "success"
                  ? styles.statusSuccess
                  : styles.statusError
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Отправка..." : "Отправить заявку"}
          </button>
        </form>
      </div>
    </div>
  );
}
