import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import axios from 'axios';
import { Order } from '../../../interfaces';


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const tx = searchParams.get('tx');
    
    try {

        // traer orden de la bd
        const result = await sql`SELECT * from Orders WHERE id = ${orderId};`;
        const order = result.rows[0] as Order;

        // traer la tx via API
        const params = {
            "id": 1,
            "jsonrpc": "2.0",
            "method": "eth_getTransactionByHash",
            "params": [`${tx}`]
        };
        let detailTx = await axios.post(process.env.RPC_URL as string, params);
        
        // Obtener el amount
        const decimalValue = BigInt(`0x${detailTx.data.result.input.substring(75)}`).toString();
        const amountTx = parseInt(decimalValue.slice(0, -18));

        // Comparar montos
        let status = 'Completed'; 
        const newBalance = amountTx + order.payed_amount;
        if (newBalance < order.amount) {
            status = 'Incomplete';
        }

        // actualizar orden a (incomplete o completed)
        await sql`UPDATE Orders SET transaction_hash = ${tx}, payed_amount = ${newBalance}, order_status = ${status} WHERE id = ${orderId};`;

        // pegarle al contrato escrow
        


    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json({ status: 200 });
}