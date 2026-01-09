import Footer from "../../components/Footer/Footer";
import HeroSection from "./components/HeroSection/HeroSection";
import styles from "./ServicesPage.module.css";

export default function ServicesPage() {
  return (
    <div className={styles.servicesPage}>
      <main>
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
}
