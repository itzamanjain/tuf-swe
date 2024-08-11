'use client'
import { useState } from "react";

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
    <div className="h-[400px] flex flex-col items-center justify-center space-y-4">
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
            className="absolute inset-0 flex items-center justify-center p-6 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white border-opacity-18 text-white [backface-visibility:hidden]"
          >
            <p className="text-2xl font-semibold">
              {isEditing ? (
                <input
                  type="text"
                  value={editedQuestion}
                  onChange={(e) => setEditedQuestion(e.target.value)}
                  className="w-full text-black"
                />
              ) : (
                question
              )}
            </p>
          </div>

          {/* Back Side */}
          <div
            className="absolute inset-0 flex items-center justify-center p-6 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white border-opacity-18 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]"
          >
            <p className="text-3xl font-bold">
              {isEditing ? (
                <input
                  type="text"
                  value={editedAnswer}
                  onChange={(e) => setEditedAnswer(e.target.value)}
                  className="w-full text-black"
                />
              ) : (
                answer
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Admin Buttons */}
      <div className="flex space-x-4">
        {isEditing ? (
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Edit
          </button>
        )}
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
