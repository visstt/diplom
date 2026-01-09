import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./CatalogContent.module.css";

// Моковые данные
const mockProducts = [
  {
    id: 1,
    name: "1С Бухгалтерия ПРОФ",
    price: 20100,
    image: "/img/productPhoto.png",
    category: "Бухгалтерский учет",
  },
  {
    id: 2,
    name: "1С Бухгалтерия КФО",
    price: 51700,
    image: "/img/productPhoto.png",
    category: "Бухгалтерский учет",
  },
  {
    id: 3,
    name: "1С Бухгалтерия Базовая",
    price: 4400,
    image: "/img/productPhoto.png",
    category: "Бухгалтерский учет",
  },
  {
    id: 4,
    name: "1С ЗУП ПРОф",
    price: 34800,
    image: "/img/productPhoto.png",
    category: "Кадровый учет",
  },
  {
    id: 5,
    name: "1С:Управление торговлей Базовая",
    price: 9700,
    image: "/img/productPhoto.png",
    category: "Торговый учет, продажи",
  },
  {
    id: 6,
    name: "1С:Документооборот ПРОФ",
    price: 55300,
    image: "/img/productPhoto.png",
    category: "Производственный учет",
  },
];

const categories = [
  "Бухгалтерский учет",
  "Кадровый учет",
  "Торговый учет, продажи",
  "Складской учет",
  "Производственный учет",
  "Лицензии, интеграции",
];

const priceRanges = [
  { label: "1.000 - 5.000 руб", min: 1000, max: 5000 },
  { label: "5.000 - 10.000 руб", min: 5000, max: 10000 },
  { label: "20.000 - 50.000 руб", min: 20000, max: 50000 },
  { label: "50.000 - 100.000 руб", min: 50000, max: 100000 },
];

export default function CatalogContent() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceRangeChange = (range) => {
    setSelectedPriceRanges((prev) => {
      const rangeString = `${range.min}-${range.max}`;
      return prev.includes(rangeString)
        ? prev.filter((r) => r !== rangeString)
        : [...prev, rangeString];
    });
  };

  const filteredProducts = mockProducts.filter((product) => {
    // Фильтр по категориям
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(product.category)
    ) {
      return false;
    }

    // Фильтр по цене
    if (selectedPriceRanges.length > 0) {
      const inPriceRange = selectedPriceRanges.some((range) => {
        const [min, max] = range.split("-").map(Number);
        return product.price >= min && product.price <= max;
      });
      if (!inPriceRange) return false;
    }

    // Фильтр по поиску
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className={styles.catalogContent}>
      <div className="container">
        <div className={styles.breadcrumbs}>
          <span>Главная</span> &gt;{" "}
          <span className={styles.active}>Каталог</span>
        </div>

        <h1 className={styles.title}>Каталог</h1>

        <div className={styles.layout}>
          {/* Фильтры */}
          <aside className={styles.filters}>
            <div className={styles.filterGroup}>
              <h3 className={styles.filterTitle}>Категории</h3>
              {categories.map((category) => (
                <label key={category} className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>

            <div className={styles.filterGroup}>
              <h3 className={styles.filterTitle}>Цена</h3>
              {priceRanges.map((range) => (
                <label key={range.label} className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={selectedPriceRanges.includes(
                      `${range.min}-${range.max}`
                    )}
                    onChange={() => handlePriceRangeChange(range)}
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </aside>

          {/* Товары */}
          <div className={styles.productsWrapper}>
            <div className={styles.searchBar}>
              <input
                type="text"
                placeholder="Найти продукт"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <button className={styles.searchButton}>
                <IoSearch />
              </button>
            </div>

            <p className={styles.resultsCount}>
              Отображается 1-12 из {filteredProducts.length} элементов
            </p>
            <p className={styles.subtitle}>Выберите продукты 1С</p>

            {filteredProducts.length === 0 ? (
              <div className={styles.noResults}>
                <p>По выбранным фильтрам товары не найдены</p>
                <p className={styles.noResultsHint}>
                  Попробуйте изменить параметры фильтрации
                </p>
              </div>
            ) : (
              <div className={styles.productsGrid}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
