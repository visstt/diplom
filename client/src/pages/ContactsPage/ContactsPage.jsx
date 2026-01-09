import Footer from "../../components/Footer/Footer";
import MainSection from "../HomePage/components/MainSection/MainSection";
import ContactsContent from "./components/ContactsContent/ContactsContent";
import styles from "./ContactsPage.module.css";

export default function ContactsPage() {
  return (
    <div className={styles.contactsPage}>
      <main>
        <MainSection />
        <ContactsContent />
      </main>
      <Footer />
    </div>
  );
}
