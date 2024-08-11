"use client"
import React from 'react';
import Link from 'next/link';
import Home from '@/app/page';
import FlippableCard from './Flipcard';

const HomeComp = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black px-4 py-12 md:py-24">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Unlock Your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Learning</span> &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Potential</span>
          <span className="text-3xl md:text-5xl"> With </span> FlashCards
        </h1>
        <p className="text-gray-300 mt-6 text-xl">
        Interactive Flashcards at Your Fingertips to Help You Learn Faster <br /> Remember More with Less Effort.
        </p>
      </div>
      <div className="flex justify-center mt-12">
        <Link href='/admin'>
        <button
          type="button"
          className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-white font-bold py-3 px-8 rounded-full text-lg hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
        >
          Create Your First Flipcard
        </button>
        </Link>
      </div>
      <div className="mt-10">
        <FlippableCard question={"Hi! Welcome to FlashCard (Click Me)"} answer={"Click to Flip"}/>
      </div>
    </div>
  );
}

export default HomeComp;