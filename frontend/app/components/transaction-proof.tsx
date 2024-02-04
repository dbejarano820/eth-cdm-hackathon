'use client';
import { useState } from 'react';
import { BadgeDelta, Card, Metric, Text } from '@tremor/react';
import { PaymentButton } from './payment-button';
export default function TransactionProof({ orderId }: { orderId: string }) {
  const [txHash, setTxHash] = useState('');
  return (
    <>
      <p>Pague y luego pegue la TX hash abajo</p>
      <input
        type="text"
        placeholder="0x123..."
        value={txHash}
        onChange={(e) => setTxHash(e.target.value)}
        className="border-2 border-gray-300 rounded-md p-2"
      />
      <PaymentButton txHash={txHash} orderId={orderId} />
    </>
  );
}
