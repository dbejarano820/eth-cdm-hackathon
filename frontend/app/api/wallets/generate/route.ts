import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { ethers } from 'ethers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const blockchain = searchParams.get('blockchain');

  try {
    const wallets_result =
      await sql`SELECT * from Wallets WHERE user_id = ${userId} and blockchain = ${blockchain};`;
    if (wallets_result.rows.length > 0)
      throw new Error('Error: The user already has a wallet');

    const randomWallet = ethers.Wallet.createRandom();

    const publicKey = randomWallet.address;
    const privateKey = randomWallet.privateKey;
    const balance = 0;

    await sql`INSERT INTO Wallets (user_id, public_key, private_key, blockchain, balance) VALUES (${userId}, ${publicKey}, ${privateKey}, ${blockchain}, ${balance});`;
  } catch (error) {
    console.log('error: ', error);
    return NextResponse.json({ error }, { status: 500 });
  }
  return NextResponse.json({ status: 200 });
}
