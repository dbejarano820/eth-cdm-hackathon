import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { ethers } from "ethers";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const blockchain = searchParams.get('blockchain');
    
    try {
        // TODO: validar si el usuario ya tiene una wallet
        const randomWallet = ethers.Wallet.createRandom();

        const publicKey = randomWallet.address;
        const privateKey = randomWallet.privateKey;
        const balance = 0;

        await sql`INSERT INTO Wallets (user_id, public_key, private_key, blockchain, balance) VALUES (${userId}, ${publicKey}, ${privateKey}, ${blockchain}, ${balance});`;
    } catch (error) {
        console.log("error: ", error);
        return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json({ status: 200 });
}
