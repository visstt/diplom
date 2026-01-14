import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../contexts/AuthContext";
import { getProfile, updateProfile } from "../../api/user";
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    birthDate: "",
    language: "ru",
  });
  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const profile = await getProfile();
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        phone: profile.phone || "",
        birthDate: profile.birthDate
          ? new Date(profile.birthDate).toISOString().split("T")[0]
          : "",
        language: profile.language || "ru",
      });
    } catch {
      setError("Ошибка загрузки профиля");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
    setError("");
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const updateData = { ...formData };

      // Добавляем пароль, если он был введен
      if (passwordData.password.trim() || passwordData.confirmPassword.trim()) {
        if (passwordData.password !== passwordData.confirmPassword) {
          setError("Пароли не совпадают");
          setSaving(false);
          return;
        }
        if (passwordData.password.length < 6) {
          setError("Пароль должен содержать минимум 6 символов");
          setSaving(false);
          return;
        }
        updateData.password = passwordData.password;
      }

      const updated = await updateProfile(updateData);
      updateUser(updated);
      setMessage("Профиль успешно обновлен");
      setPasswordData({ password: "", confirmPassword: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Ошибка обновления профиля");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <p>Загрузка...</p>
      </div>
    );
  }

  return (
    <div className={styles.profilePage}>
      <Header />
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarCircle}>
              {formData.firstName?.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className={styles.userInfo}>
            <h1>{formData.firstName || "Пользователь"}</h1>
            <p>{user?.email}</p>
            <div className={styles.actionButtons}>
              {user?.role === "admin" && (
                <button
                  className={styles.adminBtn}
                  onClick={() => navigate("/admin")}
                >
                  Админ-панель
                </button>
              )}
              <button
                className={styles.chatBtn}
                onClick={() => navigate("/chat")}
              >
                💬 Чат с поддержкой
              </button>
            </div>
          </div>
        </div>

        <div className={styles.profileCard}>
          <form onSubmit={handleSubmit}>
            {message && <div className={styles.success}>{message}</div>}
            {error && <div className={styles.error}>{error}</div>}

            <h2 className={styles.sectionTitle}>Личная информация</h2>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Имя</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Ваше имя"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Фамилия</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Ваша фамилия"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Телефон</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+7 (___) ___-__-__"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Дата рождения</label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.infoSection}>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <label>Дата регистрации</label>
                  <p>
                    {new Date(user?.createdAt).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className={styles.languageSection}>
                  <label>Язык интерфейса</label>
                  <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="language"
                        value="ru"
                        checked={formData.language === "ru"}
                        onChange={handleChange}
                      />
                      Русский
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="language"
                        value="en"
                        checked={formData.language === "en"}
                        onChange={handleChange}
                      />
                      Английский
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.passwordSection}>
              <h2 className={styles.sectionTitle}>Безопасность</h2>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Новый пароль</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Минимум 6 символов"
                    value={passwordData.password}
                    onChange={handlePasswordChange}
                    autoComplete="new-password"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Подтверждение пароля</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Повторите пароль"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    autoComplete="new-password"
                  />
                </div>
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <button
                type="submit"
                className={styles.saveButton}
                disabled={saving}
              >
                {saving ? "Сохранение..." : "Сохранить изменения"}
              </button>
              <button
                type="button"
                className={styles.logoutButton}
                onClick={handleLogout}
              >
                Выйти из аккаунта
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
