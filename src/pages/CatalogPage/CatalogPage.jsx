import Footer from "../../components/Footer/Footer";
import HeroSection from "./components/HeroSection/HeroSection";
import styles from "./CatalogPage.module.css";

export default function CatalogPage() {
  return (
    <div className={styles.catalogPage}>
      <main>
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
}
