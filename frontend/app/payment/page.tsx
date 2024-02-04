'use client';
import { sql } from '@vercel/postgres';
import React, { useState } from 'react';
import {
  TextInput,
  Metric,
  Text,
  Title,
  NumberInput,
  Button,
  Card
} from '@tremor/react';
import CopyToClipboardButton from '../components/copy-text';
import { ESCROW_MAP } from '../constants';

export default async function PaymentPage({
  params
}: {
  params: { order_id: number };
}) {
  const [txHash, setTxHash] = useState('');
  const results = await sql`
    SELECT id, amount, payed_amount, order_status, user_id
    FROM Orders 
    WHERE id = ${params.order_id};
  `;
  //blockchain

  const data = results.rows[0] as any;
  const escrow_address = ESCROW_MAP['Avalanche'];

  const handleSubmit = async () => {
    if (!txHash) {
      alert('Please enter a TX hash.');
      return;
    }
    try {
      const response = await fetch(
        `/api/orders/validate?orderId=${params.order_id}&tx=${txHash}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const result = await response.json();
      if (response.ok) {
        // Handle success response
        alert('Payment validated successfully!');
      } else {
        // Handle server errors or payment validation failures
        alert(result.message || 'Payment validation failed.');
      }
    } catch (error) {
      console.error('Error submitting TX hash:', error);
      alert('An error occurred while validating the payment.');
    }
  };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Card className="flex flex-col justify-between center gap-5">
        <Metric>Pago para {data?.name || 'tienda X'}</Metric>
        <Text>Monto: {data?.amount}</Text>
        <CopyToClipboardButton textToCopy={escrow_address} />
        <div className="flex flex-col items-center my-6">
          <Title>Pague y luego pegue la TX hash abajo</Title>
          <TextInput
            placeholder="0x1234"
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
          />
          <Button onClick={handleSubmit}>Submit TX Hash</Button>
        </div>
      </Card>
    </main>
  );
}
