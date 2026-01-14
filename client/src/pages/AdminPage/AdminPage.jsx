import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useProducts } from "../../hooks/useProducts";
import { useServices } from "../../hooks/useServices";
import { useAuth } from "../../contexts/AuthContext";
import { getCookie } from "../../utils/cookies";
import toast from "react-hot-toast";
import styles from "./AdminPage.module.css";

export default function AdminPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { products, refetch: refetchProducts } = useProducts();
  const { services, refetch: refetchServices } = useServices();
  const [activeTab, setActiveTab] = useState("products");
  const [editingItem, setEditingItem] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // Проверка роли пользователя
    if (!user || user.role !== "admin") {
      toast.error("Доступ запрещен");
      navigate("/profile");
    }
  }, [navigate, user]);

  const handleDelete = async (id, type) => {
    if (!window.confirm("Вы уверены, что хотите удалить этот элемент?")) return;

    try {
      const token = getCookie("token");
      const endpoint = type === "product" ? "/products" : "/services";

      const response = await fetch(`http://localhost:3001${endpoint}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Удалено успешно");
        type === "product" ? refetchProducts() : refetchServices();
      } else {
        throw new Error("Ошибка при удалении");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = (item, type) => {
    setEditingItem({ ...item, type });
    setIsCreating(false);
    setSelectedFile(null);
    setPreviewUrl("");
  };

  const handleCreate = (type) => {
    setEditingItem({ 
      type, 
      name: "", 
      price: 0, 
      description: "", 
      category: "",
      image: type === "product" ? "" : undefined
    });
    setIsCreating(true);
    setSelectedFile(null);
    setPreviewUrl("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    // Проверяем тип файла
    if (!file.type.startsWith('image/')) {
      toast.error("Пожалуйста, выберите изображение");
      return;
    }

    // Проверяем размер файла (максимум 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Размер файла не должен превышать 5MB");
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
      // Очищаем поле URL при загрузке файла
      setEditingItem({ ...editingItem, image: "" });
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) return null;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      setIsUploading(true);
      const token = getCookie("token");
      const response = await fetch('http://localhost:3001/upload/image', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data.url;
      } else {
        throw new Error('Ошибка при загрузке файла');
      }
    } catch (error) {
      toast.error(error.message);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      // Общая валидация
      if (!editingItem.name.trim()) {
        toast.error("Название не может быть пустым");
        return;
      }
      
      if (!editingItem.price || editingItem.price <= 0) {
        toast.error("Цена должна быть больше 0");
        return;
      }

      // Валидация для товаров - изображение обязательно
      if (editingItem.type === "product") {
        if (!selectedFile && !editingItem.image) {
          toast.error("Изображение обязательно для товаров");
          return;
        }
        
        if (!editingItem.category?.trim()) {
          toast.error("Категория обязательна для товаров");
          return;
        }
      }

      let imageUrl = editingItem.image;
      
      // Если выбран новый файл, загружаем его
      if (selectedFile) {
        const uploadedUrl = await uploadFile();
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          return; // Прерываем если загрузка не удалась
        }
      }

      const token = getCookie("token");
      const endpoint =
        editingItem.type === "product" ? "/products" : "/services";
      const method = isCreating ? "POST" : "PATCH";
      const url = isCreating
        ? `http://localhost:3001${endpoint}`
        : `http://localhost:3001${endpoint}/${editingItem.id}`;

      // Prepare data without id and type fields
      const { id, type, ...itemData } = editingItem;
      
      // Convert price to number and update image URL
      const dataToSend = {
        ...itemData,
        price: Number(itemData.price) || 0,
        ...(editingItem.type === "product" && { image: imageUrl }),
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        toast.success(isCreating ? "Создано успешно" : "Обновлено успешно");
        setEditingItem(null);
        setIsCreating(false);
        setSelectedFile(null);
        setPreviewUrl("");
        editingItem.type === "product" ? refetchProducts() : refetchServices();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ошибка при сохранении");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.content}>
          <h1>Админ-панель</h1>

          <div className={styles.tabs}>
            <button
              className={activeTab === "products" ? styles.activeTab : ""}
              onClick={() => setActiveTab("products")}
            >
              Товары
            </button>
            <button
              className={activeTab === "services" ? styles.activeTab : ""}
              onClick={() => setActiveTab("services")}
            >
              Услуги
            </button>
          </div>

          <button
            className={styles.createBtn}
            onClick={() =>
              handleCreate(activeTab === "products" ? "product" : "service")
            }
          >
            + Создать {activeTab === "products" ? "товар" : "услугу"}
          </button>

          {activeTab === "products" ? (
            <div className={styles.list}>
              {products.map((product) => (
                <div key={product.id} className={styles.item}>
                  <div className={styles.itemWithImage}>
                    {product.image && (
                      <div className={styles.itemImagePreview}>
                        <img src={product.image} alt={product.name} />
                      </div>
                    )}
                    <div className={styles.itemInfo}>
                      <h3>{product.name}</h3>
                      <p>{product.price} ₽</p>
                      <p>{product.category}</p>
                    </div>
                  </div>
                  <div className={styles.itemActions}>
                    <button onClick={() => handleEdit(product, "product")}>
                      Редактировать
                    </button>
                    <button onClick={() => handleDelete(product.id, "product")}>
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.list}>
              {services.map((service) => (
                <div key={service.id} className={styles.item}>
                  <div className={styles.itemInfo}>
                    <h3>{service.name}</h3>
                    <p>{service.price} ₽</p>
                  </div>
                  <div className={styles.itemActions}>
                    <button onClick={() => handleEdit(service, "service")}>
                      Редактировать
                    </button>
                    <button onClick={() => handleDelete(service.id, "service")}>
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {editingItem && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <h2>{isCreating ? "Создание" : "Редактирование"}</h2>
                
                <div className={styles.formGroup}>
                  <label className={styles.requiredLabel}>Название *</label>
                  <input
                    type="text"
                    placeholder="Введите название"
                    value={editingItem.name}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, name: e.target.value })
                    }
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.requiredLabel}>Цена (₽) *</label>
                  <input
                    type="number"
                    placeholder="Введите цену"
                    value={editingItem.price}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        price: parseFloat(e.target.value),
                      })
                    }
                    min="0.01"
                    step="0.01"
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label>Описание</label>
                  <textarea
                    placeholder="Описание (необязательно)"
                    value={editingItem.description || ""}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                {editingItem.type === "product" && (
                  <>
                    <div className={styles.formGroup}>
                      <label className={styles.requiredLabel}>Категория *</label>
                      <input
                        type="text"
                        placeholder="Введите категорию"
                        value={editingItem.category || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            category: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className={styles.imageUpload}>
                      <label className={styles.requiredLabel}>Изображение товара *:</label>
                      
                      {(previewUrl || editingItem.image) ? (
                        <div className={styles.imagePreview}>
                          <img 
                            src={previewUrl || editingItem.image} 
                            alt="Preview" 
                            className={styles.previewImage}
                          />
                          <div className={styles.imageActions}>
                            <label htmlFor="file-input" className={styles.changeImageBtn}>
                              Изменить изображение
                            </label>
                            <button 
                              type="button"
                              onClick={() => {
                                setSelectedFile(null);
                                setPreviewUrl("");
                                setEditingItem({ ...editingItem, image: "" });
                              }}
                              className={styles.removeImageBtn}
                            >
                              Удалить
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div 
                          className={styles.uploadArea}
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                        >
                          <label htmlFor="file-input" className={styles.uploadLabel}>
                            <div className={styles.uploadContent}>
                              <span className={styles.uploadIcon}>📁</span>
                              <span>Нажмите для выбора изображения</span>
                              <span className={styles.uploadHint}>или перетащите файл сюда</span>
                              <span className={styles.uploadInfo}>JPG, PNG, GIF до 5MB</span>
                            </div>
                          </label>
                        </div>
                      )}
                      
                      <input
                        id="file-input"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className={styles.fileInput}
                        style={{ display: 'none' }}
                      />
                    </div>
                  </>
                )}
                <div className={styles.modalActions}>
                  <button onClick={handleSave} disabled={isUploading}>
                    {isUploading ? "Загрузка..." : "Сохранить"}
                  </button>
                  <button
                    onClick={() => {
                      setEditingItem(null);
                      setIsCreating(false);
                      setSelectedFile(null);
                      setPreviewUrl("");
                    }}
                    disabled={isUploading}
                  >
                    Отмена
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
