import React, { useState } from 'react';
import { sql } from '@vercel/postgres';
// import { ESCROW_MAP } from '../../constants';
import CopyToClipboardButton from '../../components/copy-text';
import TransactionProof from '../../components/transaction-proof';
import { Metric, Text, Card, Title, Divider } from '@tremor/react';
import { getUser } from '../../utils/getUser';
import { blockchainImages } from '../../constants';
import { determineBadge } from '../../components/order-card';
import PaymentHeader from '../../components/payment-header';

export default async function PaymentPage({
  params
}: {
  params: { orderId: string };
}) {
  const user = getUser();
  const results = await sql`
      SELECT *
      FROM Orders 
      WHERE id = ${params.orderId} ;
    `;
  const data = results.rows[0];
  const escrow_address = process.env.ESCROW_CONTRACT!;
  // const escrow_address = ESCROW_MAP['Avalanche'];
  
  const imageStyle = {
    width: '25px',
    height: '25px',
    marginRight: '10px'
  };

  return (
    <main className="p-4 md:p-10 mx-auto my-24 max-w-7xl">
      <PaymentHeader order_status={(data?.order_status as string) || ''} />
      <Card className="flex flex-col items-center gap-3">
        <Title>{user.name || ''} address</Title>
        <CopyToClipboardButton textToCopy={escrow_address} />
        <div className="flex">
          <img
            src={blockchainImages['Avalanche']}
            alt={`Avalanche Logo`}
            style={{ ...imageStyle, marginRight: '5px' }}
          />
          <Title>Avalanche</Title>
        </div>
        <Divider />
        <div className="flex flex-col items-center">
          <Title>Amount: ${data?.amount}</Title>
          <TransactionProof orderId={params.orderId} />
        </div>
      </Card>
    </main>
  );
}
