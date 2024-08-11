import { NextResponse, NextRequest } from 'next/server';
import { query } from '@/lib/db';  // Ensure this path is correct based on your project structure

// Helper function to handle errors
function handleErrorResponse(error, message) {
  console.error(message, error);
  return NextResponse.json(
    { message, error: error.message },
    { status: 500 }
  );
}

// Adding a flashcard
export async function POST(req) {
  try {
    const { question, answer } = await req.json();
    console.log('Adding flashcard:', question, answer);

    // Validate input
    if (!question || !answer) {
      return NextResponse.json(
        { message: 'Question and answer are required' },
        { status: 400 }
      );
    }

    // Insert data into the database
    const result = await query({
      query: 'INSERT INTO flipcarddata (question, answer) VALUES (?, ?)',
      values: [question, answer],
    });

    // Return success response
    return NextResponse.json(
      { message: 'Flashcard added successfully', id: result.insertId },
      { status: 200 }
    );
  } catch (error) {
    return handleErrorResponse(error, 'Error adding flashcard:');
  }
}

// Updating a flashcard
export async function PUT(req) {
  try {
    const { id, question, answer } = await req.json();
    console.log('Updating flashcard:', id, question, answer);

    // Validate input
    if (typeof id !== 'number' || !question || !answer) {
      return NextResponse.json(
        { message: 'ID, question, and answer are required' },
        { status: 400 }
      );
    }

    // Update data in the database
    await query({
      query: 'UPDATE flipcarddata SET question = ?, answer = ? WHERE id = ?',
      values: [question, answer, id],
    });

    // Return success response
    return NextResponse.json(
      { message: 'Flashcard updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    return handleErrorResponse(error, 'Error updating flashcard:');
  }
}

// Deleting a flashcard
export async function DELETE(req) {
  try {
    const { id } = await req.json();
    console.log('Deleting flashcard:', id);

    // Validate input
    if (typeof id !== 'number') {
      return NextResponse.json(
        { message: 'ID is required' },
        { status: 400 }
      );
    }

    // Delete data from the database
    await query({
      query: 'DELETE FROM flipcarddata WHERE id = ?',
      values: [id],
    });

    // Return success response
    return NextResponse.json(
      { message: 'Flashcard deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return handleErrorResponse(error, 'Error deleting flashcard:');
  }
}
