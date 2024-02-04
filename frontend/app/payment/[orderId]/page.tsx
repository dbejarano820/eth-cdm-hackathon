import React, { useState } from 'react';
import { sql } from '@vercel/postgres';
// import { ESCROW_MAP } from '../../constants';
import CopyToClipboardButton from '../../components/copy-text';
import TransactionProof from '../../components/transaction-proof';
import { Metric, Text } from '@tremor/react';

export default async function PaymentPage({
  params
}: {
  params: { orderId: string };
}) {
  console.log('ORDERID:', params.orderId);
  const results = await sql`
      SELECT *
      FROM Orders 
      WHERE id = ${params.orderId};
    `;
    
  const data = results.rows[0];
  const escrow_address = process.env.ESCROW_CONTRACT!;
  // const escrow_address = ESCROW_MAP['Avalanche'];

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className="flex flex-col items-center gap-5">
        <Metric>Pago para {data?.name || 'Tienda X'}</Metric>
        <Text>Monto: {data?.amount}</Text>
        <Text>Estado: {data?.order_status}</Text>
        <CopyToClipboardButton textToCopy={escrow_address} />
        <div className="flex flex-col items-center my-6">
          <TransactionProof orderId={params.orderId} />
        </div>
      </div>
    </main>
  );
}
