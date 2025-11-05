// src/App.jsx
import { useState } from "react";
import "./App.css";
import MultipleChoice from "./page/MultipleChoice";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Monopoly from "./page/Monopoly";
import FlashcardQuiz from "./components/flashcard/FlashCardQuiz";

function App() {
  const [activeSection, setActiveSection] = useState("quiz");

  const renderMainContent = () => {
    switch (activeSection) {
      case "quiz":
        return <MultipleChoice />;
      case "section2":
        return <Monopoly />;
      case "section3":
        return <FlashcardQuiz />;
      default:
        return <MultipleChoice />;
    }
  };

  const isPixelGame = activeSection === "section2";

  return (
    <div
      className={
        isPixelGame
          ? "flex flex-col h-dvh bg-[#FBF8E8] text-stone-900 font-sans" // Đổi thành h-dvh để có chiều cao viewport chính xác
          : "flex flex-col min-h-screen bg-stone-100 text-stone-900 font-sans"
      }
    >
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main
        className={
          isPixelGame
            ? "flex-grow w-full overflow-hidden" // SỬA ĐỔI CHÍNH: "overflow-auto" -> "overflow-hidden"
            : "flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
        }
      >
        {renderMainContent()}
      </main>

      <Footer />
    </div>
  );
}

export default App;