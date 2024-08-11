'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import axios from 'axios';
import AdminFlipCard from '@/components/AdminFlipCard'; // Make sure this path is correct

export default function AddFlashcard() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Fetch all flashcards on component mount
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get('/api/flashcard'); // Define your API endpoint
        setFlashcards(response.data.flashcards);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      }
    };

    fetchFlashcards();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      const response = await axios.post('/api/addflipcard', { question, answer });
      if (response.status === 200) {
        setMessage('Flashcard added successfully!');
        setQuestion('');
        setAnswer('');
        setFlashcards([...flashcards, response.data]); // Add the new card to the list
      } else {
        throw new Error(response.data.message || 'Failed to add flashcard');
      }
    } catch (error) {
      console.error('Error adding flashcard:', error);
      setMessage(error.response?.data?.message || error.message);
      setIsError(true);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen text-black bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center p-4">
      <Head>
        <title>Add New Flashcard</title>
        <meta name="description" content="Add a new flashcard to your collection" />
      </Head>

      <main className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Add New Flashcard</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="question" className="block text-white mb-2">Question:</label>
            <input
              id="question"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter the question"
              required
              className="w-full p-2 rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="answer" className="block text-white mb-2">Answer:</label>
            <input
              id="answer"
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter the answer"
              required
              className="w-full p-2 rounded-md"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
          >
            Add Flashcard
          </button>
        </form>

        {message && (
          <p className={`mt-4 text-center ${isError ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}
      </main>

      <div className="mt-8 w-full ">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Your Flashcards</h2>
        <div className="relative">
          <button 
            onClick={scrollLeft} 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white p-2 rounded-full shadow-md"
          >
            &lt;
          </button>
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto scroll-smooth space-x-4 pb-2"
          >
            {flashcards.map((flashcard) => (
              <AdminFlipCard
                key={flashcard.id}
                id={flashcard.id}
                question={flashcard.question}
                answer={flashcard.answer}
              />
            ))}
          </div>
          <button 
            onClick={scrollRight} 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white p-2 rounded-full shadow-md"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
