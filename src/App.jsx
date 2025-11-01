// src/App.jsx
import { useState } from "react";
import "./App.css";
import MultipleChoice from "./page/MultipleChoice";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Monopoly from "./page/Monopoly";
import FlashcardQuiz from "./components/flashcard/FlashCardQuiz"; // IMPORT MỤC MỚI

function App() {
  const [activeSection, setActiveSection] = useState("quiz");

  const renderMainContent = () => {
    switch (activeSection) {
      case "quiz":
        return <MultipleChoice />;
      case "section2":
        return <Monopoly />;
      case "section3":
        return <FlashcardQuiz />; // SỬ DỤNG COMPONENT MỚI CHO MỤC 3
      default:
        return <MultipleChoice />;
    }
  };

  const isPixelGame = activeSection === "section2";

  return (
    <div
      className={
        isPixelGame
          ? "w-screen h-screen bg-[#FBF8E8]"
          : "flex flex-col min-h-screen bg-stone-100 text-stone-900 font-sans"
      }
    >
      {!isPixelGame && (
        <Header
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      )}

      <main
        className={
          isPixelGame
            ? "w-full h-full"
            : "flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12" // Layout web
        }
      >
        {renderMainContent()}
      </main>

      {!isPixelGame && <Footer />}
    </div>
  );
}

export default App;