import { useState } from "react";
import "./App.css";
import MultipleChoice from "./page/MultipleChoice";
import QuizGame from "./components/Footer";
import PlaceholderSection from "./components/PlaceholderSection";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [activeSection, setActiveSection] = useState("quiz"); 

  const renderMainContent = () => {
    switch (activeSection) {
      case "quiz":
        return <MultipleChoice />;
      case "section2":
        return <PlaceholderSection title="Mục 2" />;
      case "section3":
        return <PlaceholderSection title="Mục 3" />;
      default:
        return <QuizGame />;
    }
  };
  return (
    <div className="flex flex-col min-h-screen bg-stone-100 text-stone-900 font-sans">
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {renderMainContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
