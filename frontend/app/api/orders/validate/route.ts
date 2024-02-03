import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import axios from 'axios';

    export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const tx = searchParams.get('tx');
    
    try {

        // traer orden de la bd
        const order = await sql`SELECT * Orders WHERE id = ${orderId};`;

        // traer la tx via API
        const params = {
            "id": 1,
            "jsonrpc": "2.0",
            "method": "eth_getTransactionByHash",
            "params": [`${tx}`]
        };
        let detailTx = await axios.post(process.env.RPC_URL as string, params);
        
        // Extraer la parte que deseas
        var amountTx = parseInt(detailTx.input.substring(34), 16);

        // Comparar montos
        let status = 'Completed'; 
        if (order.amount < amountTx) {
            status = 'Incomplete';
        }

        // actualizar orden a (incomplete o completed)
        await sql`UPDATE Orders SET transaction_hash = ${tx}, payed_amount = ${amountTx}, order_status = ${status} WHERE id = ${orderId};`;

        // pegarle al contrato escrow
        


    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json({ status: 200 });
}