import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const amount = searchParams.get('amount');
  const orderStatus = 'Pending';

  try {
    // TODO: validar que exista el usuario
    // if (!user || !ownerName) throw new Error('User not exist');
    await sql`INSERT INTO Orders (user_id, amount, order_status) VALUES (${userId}, ${amount}, ${orderStatus});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  return NextResponse.json({ status: 200 });
}
