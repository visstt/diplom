import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoCall } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { getCart, removeFromCart, clearCart } from "../../api/cart";
import { useAuth } from "../../contexts/AuthContext";
import OrderSuccessModal from "../../components/OrderSuccessModal/OrderSuccessModal";
import styles from "./CheckoutPage.module.css";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [cartData, setCartData] = useState({ items: [], total: 0, count: 0 });
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    agreeToPolicy: false,
  });
  const [orderId] = useState(Math.floor(Math.random() * 100000));
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Войдите в аккаунт для оформления заказа");
      navigate("/catalog");
      return;
    }
    loadCart();
  }, [isAuthenticated, navigate]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const data = await getCart();
      if (data.items.length === 0) {
        toast.error("Корзина пуста");
        navigate("/catalog");
        return;
      }
      setCartData(data);
    } catch (error) {
      console.error("Ошибка загрузки корзины:", error);
      toast.error("Ошибка загрузки корзины");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeFromCart(itemId);
      await loadCart();
      toast.success("Товар удален из заказа");
    } catch (error) {
      console.error("Ошибка удаления товара:", error);
      toast.error("Ошибка удаления товара");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Введите ваше имя");
      return;
    }

    if (!formData.phone.trim()) {
      toast.error("Введите номер телефона");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Введите e-mail");
      return;
    }

    if (!formData.agreeToPolicy) {
      toast.error("Необходимо согласие на обработку данных");
      return;
    }

    try {
      // Очищаем корзину
      await clearCart();

      // Сохраняем данные заказа и показываем модалку
      setOrderData({
        orderId: orderId,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        total: cartData.total,
      });
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Ошибка при оформлении заказа:", error);
      toast.error("Ошибка при оформлении заказа");
    }
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    navigate("/");
  };

  const handleClose = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.logo}>
              <img src="/img/logo.svg" alt="logo" />
              <span>ТИТАН</span>
            </div>
            <h1 className={styles.title}>Оформление заказа #{orderId}</h1>
            <a href="tel:+73535376243" className={styles.phone}>
              <IoCall /> +7 (3532) 37-62-43
            </a>
          </div>
        </div>
        <div className={styles.pageContent}>
          <div className={styles.loading}>Загрузка...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <img src="/img/logo.svg" alt="logo" />
            <span>ТИТАН</span>
          </div>
          <h1 className={styles.title}>Оформление заказа #{orderId}</h1>
          <a href="tel:+73535376243" className={styles.phone}>
            <IoCall /> +7 (3532) 37-62-43
          </a>
        </div>
      </div>

      <div className={styles.pageContent}>
        <div className={styles.modal}>
          <button className={styles.closeButton} onClick={handleClose}>
            ×
          </button>

          <div className={styles.modalContent}>
            <div className={styles.leftSection}>
              <div className={styles.orderInfo}>
                <p className={styles.itemsCount}>
                  Товаров в заказе: <span>{cartData.count} шт</span>
                </p>
                <h2 className={styles.sectionTitle}>Состав заказа</h2>

                <div className={styles.orderItems}>
                  {cartData.items.map((item) => (
                    <div key={item.id} className={styles.orderItem}>
                      <img
                        src={`http://localhost:3001${item.product.image}`}
                        alt={item.product.name}
                        className={styles.productImage}
                      />
                      <div className={styles.productInfo}>
                        <p className={styles.productName}>
                          {item.product.name}
                        </p>
                        <p className={styles.productPrice}>
                          {(item.product.price * item.quantity).toLocaleString(
                            "ru-RU"
                          )}{" "}
                          ₽
                        </p>
                      </div>
                      <button
                        className={styles.removeButton}
                        onClick={() => handleRemoveItem(item.id)}
                        title="Удалить"
                      >
                        <IoTrashOutline />
                      </button>
                    </div>
                  ))}
                </div>

                <div className={styles.totalSection}>
                  <span className={styles.totalLabel}>Общая сумма заказа:</span>
                  <span className={styles.totalAmount}>
                    {cartData.total.toLocaleString("ru-RU")} ₽
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.rightSection}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <input
                  type="text"
                  name="name"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.input}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Номер телефона"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={styles.input}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.input}
                />

                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    name="agreeToPolicy"
                    checked={formData.agreeToPolicy}
                    onChange={handleInputChange}
                  />
                  <span>
                    Я даю согласие на обработку моих персональных данных и
                    согласился с{" "}
                    <a href="/privacy" target="_blank">
                      Политикой конфиденциальности
                    </a>
                  </span>
                </label>

                <button type="submit" className={styles.submitButton}>
                  Оформить заказ
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <OrderSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
        orderData={orderData}
      />
    </div>
  );
}
