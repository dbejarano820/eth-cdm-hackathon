import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

    export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const amount = searchParams.get('amount');
    const description = searchParams.get('description');
    const paymentUrl = searchParams.get('paymentUrl');
    const orderStatus = 'Pending';
    
    try {
        // TODO: validar que exista el usuario
        // if (!user || !ownerName) throw new Error('User not exist');
        await sql`INSERT INTO Orders (user_id, amount, description, payment_url, created_at, order_status) VALUES (${userId}, ${amount}, ${description}, ${paymentUrl}, CURRENT_TIMESTAMP, ${orderStatus});`;
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json({ status: 200 });
}