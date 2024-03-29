import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { User } from '../../../interfaces';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const amount = searchParams.get('amount');
  const description = searchParams.get('description');
  const blockchain = searchParams.get('blockchain');
  const baseURL = `${request.headers.get(
    'x-forwarded-proto'
  )}://${request.headers.get('host')}`;
  const orderStatus = 'Pending';

  try {
    const users_result = await sql`SELECT * from Users WHERE id = ${userId};`;
    if (users_result.rows.length == 0) throw new Error('Error: User not exist');
    const result =
      await sql`INSERT INTO Orders (user_id, amount, description, created_at, order_status, blockchain) VALUES (${userId}, ${amount}, ${description}, CURRENT_TIMESTAMP, ${orderStatus}, ${blockchain}) RETURNING id;`;
    const orderId = result.rows[0].id;
    const paymentURL = `${baseURL}/payment/${orderId}`;
    await sql`UPDATE Orders SET payment_url = ${paymentURL} WHERE id = ${orderId};`;
    const orders_result =
      await sql`SELECT * from Orders WHERE id = ${orderId};`;
    const order = orders_result.rows[0];
    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
