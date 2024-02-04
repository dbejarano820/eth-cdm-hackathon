import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    const email = searchParams.get('email');
    const totalBalance = 0;

    try {
        const users_result = await sql`SELECT * from Users WHERE email = ${email};`;
        if (users_result.rows.length > 0) throw new Error('Error: User exist');
        await sql`INSERT INTO Users (name, email, total_balance) VALUES (${name}, ${email}, ${totalBalance});`;
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json({ status: 200 });
}
