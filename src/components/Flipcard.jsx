'use client'
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function FlippableCard({question, answer}) {
  const [flipped, setFlipped] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/page-turn.mp3');
  }, []);

  const handleFlip = () => {
    setFlipped(!flipped);
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset audio to start
      audioRef.current.play();
    }
  };

  return (
    <div className="h-[400px] flex items-center justify-center perspective-1000">
      <motion.div
        className="relative w-96 h-56 cursor-pointer"
        onClick={handleFlip}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className={`absolute w-full h-full rounded-2xl shadow-lg transition-all duration-500 [transform-style:preserve-3d] ${
            flipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* Front Side */}
          <div
            className="absolute inset-0 flex items-center justify-center p-8 rounded-2xl bg-gradient-to-br from-purple-900 to-indigo-500 text-white [backface-visibility:hidden]"
          >
            <p className="text-3xl font-bold text-center leading-tight">{question}</p>
          </div>

          {/* Back Side */}
          <div
            className="absolute inset-0 flex items-center justify-center p-8 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-500 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]"
          >
            <p className="text-2xl font-semibold text-center leading-relaxed">{answer}</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}