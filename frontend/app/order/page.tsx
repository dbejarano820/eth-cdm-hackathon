'use client';
import React, { useState } from 'react';
import {
  TextInput,
  Metric,
  Text,
  Title,
  NumberInput,
  Button
} from '@tremor/react';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { SelectChain } from '../components/select-chain';
import { BackButton } from '../components/back-button';
import QRCode from 'qrcode.react';

export default function StatsPage() {
  const [selectedChain, setSelectedChain] = useState<string>('');
  const [amount, setAmount] = useState<number | string>('');
  const [description, setDescription] = useState<string>('');
  const [qrCode, setQRCode] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Aquí iría la lógica para llamar a tu API con los datos del formulario
    // const response = await fetch('tu-api-endpoint', { ... });
    const response = await fetch(
      `/api/orders/create?userId=${1}&amount=${amount}&description=${description}&blockchain=${selectedChain}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const result = await response.json();
    const mockApiResponse = { qrData: result.order.payment_url };
    setQRCode(mockApiResponse.qrData);
    setIsSubmitting(false);
  };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <BackButton />
      <div className="my-6">
        <Metric className="mb-3">New order</Metric>
        <Title>Payment method</Title>
        <SelectChain
          value={selectedChain}
          setValue={setSelectedChain}
          disabled={isSubmitting}
        />
        <div className="my-3">
          <Title>Amount</Title>
          <NumberInput
            icon={CurrencyDollarIcon}
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        <TextInput
          className="h-10"
          placeholder="Ingrese una descripción"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isSubmitting}
        />
      </div>
      <Button onClick={handleSubmit} disabled={isSubmitting}>
        Cobrar
      </Button>
      {qrCode && !isSubmitting && (
        <div className="my-3">
          <QRCode value={qrCode} />
        </div>
      )}
    </main>
  );
}
