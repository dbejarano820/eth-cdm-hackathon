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
import { getUser } from '../utils/getUser';

export default function StatsPage() {
  const [selectedChain, setSelectedChain] = useState<string>('');
  const [amount, setAmount] = useState<number | string>('');
  const [description, setDescription] = useState<string>('');
  const [qrCode, setQRCode] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const user = getUser();

  const formatAsCurrency = (value: string) => {
    const numberValue = parseFloat(value.replace(/[^0-9.-]/g, ''));
  
    if (isNaN(numberValue)) {
      return ''; // Manejar entrada inválida
    }
  
    return numberValue.toLocaleString('es-ES', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    const response = await fetch(
      `/api/orders/create?userId=${user.id}&amount=${amount}&description=${description}&blockchain=${selectedChain}`,
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
            enableStepper={false}
            icon={CurrencyDollarIcon}
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        <Title>Description</Title>
        <TextInput
          className="h-10"
          placeholder="Order description (optional)"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isSubmitting}
        />
      </div>
      <div className="flex justify-center mt-4">
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!!qrCode}
          className="shadow-md"  // Agrega sombra al botón
        >
          Create QR order
        </Button>
      </div>
      {qrCode && !isSubmitting && (
      <div className="flex flex-col items-center justify-center my-4">
        <div className="border border-gray-300 p-2 rounded-md">
          <QRCode
            size={300}
            renderAs="canvas"
            value={qrCode}
          />
        </div>
        <h1
          className="text-sm text-gray-600 mt-1"
        >
          Show this QR to your client
        </h1>
      </div>
    )}
    </main>
  );
}
