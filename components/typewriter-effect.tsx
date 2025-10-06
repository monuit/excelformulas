"use client";

import { useEffect, useState } from "react";

const TYPING_PHRASES = [
  "Create complex VLOOKUP formulas in seconds...",
  "Debug your spreadsheet errors instantly...",
  "Generate VBA macros without coding...",
  "Build pivot table formulas effortlessly...",
  "Master INDEX-MATCH like a pro...",
  "Automate Excel tasks with AI...",
];

export function TypewriterEffect() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentPhrase = TYPING_PHRASES[currentPhraseIndex];

    const timer = setTimeout(() => {
      if (isDeleting) {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentPhrase.slice(0, currentText.length - 1));
          setTypingSpeed(50);
        } else {
          // Move to next phrase
          setIsDeleting(false);
          setCurrentPhraseIndex(
            (currentPhraseIndex + 1) % TYPING_PHRASES.length
          );
          setTypingSpeed(500);
        }
      } else if (currentText.length < currentPhrase.length) {
        // Typing forward
        setCurrentText(currentPhrase.slice(0, currentText.length + 1));
        setTypingSpeed(100);
      } else {
        // Pause at end before deleting
        setTypingSpeed(2000);
        setIsDeleting(true);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex, typingSpeed]);

  return (
    <span className="text-2xl text-gray-600 sm:text-3xl">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
