import { query } from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Getting all flashcards');
    
    const results = await query({
      query: 'SELECT * FROM flipcarddata',
      values: [],
    });

    return NextResponse.json({ flashcards: results }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching flashcards:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}