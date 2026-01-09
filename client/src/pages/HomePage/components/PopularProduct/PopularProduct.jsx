import { useState } from "react";
import styles from "./PopularProduct.module.css";
import ProductCard from "./ProductCard";
import ProductModal from "../../../../components/ProductModal/ProductModal";

const mockProducts = [
  {
    id: 1,
    name: "1С Бухгалтерия ПРОФ",
    price: 20100,
    image: "/img/productPhoto.png",
  },
  {
    id: 2,
    name: "1С ЗУП ПРОФ",
    price: 34800,
    image: "/img/productPhoto.png",
  },
  {
    id: 3,
    name: "1С Бухгалтерия Базовая",
    price: 4400,
    image: "/img/productPhoto.png",
  },
  {
    id: 4,
    name: "1С:Управление торговлей",
    price: 9700,
    image: "/img/productPhoto.png",
  },
  {
    id: 5,
    name: "1С:Документооборот",
    price: 55300,
    image: "/img/productPhoto.png",
  },
  {
    id: 6,
    name: "1С Бухгалтерия КФО",
    price: 51700,
    image: "/img/productPhoto.png",
  },
];

export default function PopularProduct() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className={styles.popularProduct}>
      <div className="container">
        <h2 className={styles.title}>Популярные продукты</h2>

        <div className={styles.card_container}>
          {mockProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.name}
              price={`${product.price.toLocaleString("ru-RU")} ₽`}
              onClick={() => handleProductClick(product)}
            />
          ))}
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
