import Footer from "../../components/Footer/Footer";
import AboutContent from "./components/AboutContent/AboutContent";
import styles from "./AboutPage.module.css";
import ContactSection from "../HomePage/components/ContactSection/ContactSection";
import MainSection from "../HomePage/components/MainSection/MainSection";

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <main>
        <MainSection />
        <AboutContent />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
