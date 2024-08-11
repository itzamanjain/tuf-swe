'use client'

import { useState, useRef, useEffect } from "react";
import Flipcard from '@/components/Flipcard';
import Link from "next/link";

export default function Home() {
  const [currentCard, setCurrentCard] = useState(0);
  const [cards, setCards] = useState([]); // Initialize the state for flashcards
  const [loading, setLoading] = useState(true); // State to track loading status
  const containerRef = useRef(null);

  useEffect(() => {
    // Fetch the flashcards from the API
    const fetchFlashcards = async () => {
      try {
        const response = await fetch('/api/flashcard');
        const data = await response.json();
        setCards(data.flashcards); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching is complete
      }
    };

    fetchFlashcards();
  }, []); // Empty dependency array means this useEffect runs once on component mount

  const nextCard = () => {
    setCurrentCard((prev) => Math.min(prev + 1, cards.length - 1));
  };

  const prevCard = () => {
    setCurrentCard((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: currentCard * 320, // 320px is the width of each card + gap
        behavior: 'smooth'
      });
    }
  }, [currentCard]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-red-500 flex items-center justify-center p-4">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-red-500 flex flex-col items-center justify-center p-4">
      <div 
        ref={containerRef}
        className="w-full max-w-screen-lg overflow-x-hidden"
      >
        <div className="flex gap-4 transition-transform duration-300 ease-in-out" style={{ width: `${cards.length * 320}px` }}>
          {cards.map((card, index) => (
            <div key={index} className="w-[300px] flex-shrink-0">
              <Flipcard question={card.question} answer={card.answer} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 flex gap-4">
        <button
          onClick={prevCard}
          disabled={currentCard === 0}
          className="px-4 py-2 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl text-white hover:bg-opacity-30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={nextCard}
          disabled={currentCard === cards.length - 1}
          className="px-4 py-2 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl text-white hover:bg-opacity-30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      <Link href='/admin'>
        <button className="px-4 py-2 mt-3 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl text-white hover:bg-opacity-30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >Go to admin Page</button>
        </Link>
    </div>
  );
}
