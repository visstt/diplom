import styles from "./PopularProduct.module.css";
import ProductCard from "./ProductCard";

export default function PopularProduct() {
  return (
    <div className={styles.popularProduct}>
      <div className="container">
        <h2 className={styles.title}>Популярные продукты</h2>

        <div className={styles.card_container}>
          <ProductCard
            image="/img/productPhoto.png"
            title="1С Бухгалтерия ПРОФ"
            price="20 100 р"
          />
          <ProductCard
            image="/img/productPhoto.png"
            title="1С Бухгалтерия ПРОФ"
            price="20 100 р"
          />
          <ProductCard
            image="/img/productPhoto.png"
            title="1С Бухгалтерия ПРОФ"
            price="20 100 р"
          />
          <ProductCard
            image="/img/productPhoto.png"
            title="1С Бухгалтерия ПРОФ"
            price="20 100 р"
          />
          <ProductCard
            image="/img/productPhoto.png"
            title="1С Бухгалтерия ПРОФ"
            price="20 100 р"
          />
          <ProductCard
            image="/img/productPhoto.png"
            title="1С Бухгалтерия ПРОФ"
            price="20 100 р"
          />
        </div>
      </div>
    </div>
  );
}
