'use client'
import { useState } from "react";
import { FaPen, FaTrash, FaCheck } from "react-icons/fa"; // Import icons

export default function AdminFlipCard({ id, question, answer }) {
  const [flipped, setFlipped] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(question);
  const [editedAnswer, setEditedAnswer] = useState(answer);

  // Handle Edit Request
  const handleEdit = async () => {
    try {
      const res = await fetch('/api/addflipcard', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, question: editedQuestion, answer: editedAnswer }),
      });

      if (res.ok) {
        alert('Flashcard updated successfully!');
        setIsEditing(false);
      } else {
        alert('Failed to update flashcard');
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  };

  // Handle Delete Request
  const handleDelete = async () => {
    try {
      const res = await fetch('/api/addflipcard', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        alert('Flashcard deleted successfully!');
        // You might want to remove the card from the UI here
      } else {
        alert('Failed to delete flashcard');
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  };

  return (
    <div className="h-[400px] flex flex-col items-center justify-center">
      <div
        className="relative w-80 h-48 [perspective:1000px] group"
        onClick={() => !isEditing && setFlipped(!flipped)}
      >
        <div
          className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] ${
            flipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* Front Side */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white border-opacity-18 text-white [backface-visibility:hidden]"
          >
            <p className="text-2xl font-semibold mb-4">
              {isEditing ? (
                <input
                  type="text"
                  value={editedQuestion}
                  onChange={(e) => setEditedQuestion(e.target.value)}
                  className="w-full text-black p-1 rounded"
                />
              ) : (
                question
              )}
            </p>
            {/* Admin Icons */}
            <div className="absolute bottom-2 right-2 flex space-x-2">
              {isEditing ? (
                <FaCheck
                  onClick={handleEdit}
                  className="text-green-500 cursor-pointer"
                  size={23}
                />
              ) : (
                <FaPen
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                  className="text-green-500 mr-2 cursor-pointer"
                  size={23}
                />
              )}
              <FaTrash
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                className="text-red-600  ml-2 cursor-pointer"
                size={23}
              />
            </div>
          </div>

          {/* Back Side */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white border-opacity-18 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]"
          >
            <p className="text-3xl font-bold mb-4">
              {isEditing ? (
                <input
                  type="text"
                  value={editedAnswer}
                  onChange={(e) => setEditedAnswer(e.target.value)}
                  className="w-full text-black p-1 rounded"
                />
              ) : (
                answer
              )}
            </p>
            {/* Admin Icons */}
            <div className="absolute bottom-2 right-2 flex space-x-2">
              {isEditing ? (
                <FaCheck
                  onClick={handleEdit}
                  className="text-green-500 cursor-pointer"
                  size={20}
                />
              ) : (
                <FaPen
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                  className="text-blue-500 cursor-pointer"
                  size={20}
                />
              )}
              <FaTrash
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                className="text-red-500 cursor-pointer"
                size={20}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}