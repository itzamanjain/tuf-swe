'use client'
import { useState } from "react";

export default function FlippableCard({question, answer}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="h-[400px] flex items-center justify-center  " >
      <div
        className="relative w-80 h-48 [perspective:1000px] group"
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] ${
            flipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* Front Side */}
          <div
            className="absolute inset-0 flex items-center justify-center p-6 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white border-opacity-18 text-white [backface-visibility:hidden]"
          >
            <p className="text-2xl font-semibold">{question}</p>
          </div>

          {/* Back Side */}
          <div
            className="absolute inset-0 flex items-center justify-center p-6 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white border-opacity-18 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]"
          >
            <p className="text-3xl font-bold">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}