'use client';
import { Button } from '@tremor/react';
import { useRouter } from 'next/navigation';

export function PaymentButton({
  txHash,
  orderId
}: {
  txHash: string;
  orderId: string;
}) {
  const router = useRouter();

  const handleSubmit = async () => {
    console.log('Payment');
    if (!txHash) {
      alert('Please enter a TX hash.');
      return;
    }
    try {
      const response = await fetch(
        `/api/orders/validate?orderId=${orderId}&tx=${txHash}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          cache: "no-store"
        }
      );
      const result = await response.json();
      if (response.ok) {
        alert('Payment validated successfully!');
        router.refresh();
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
    <Button className="mt-3 w-full" onClick={handleSubmit} variant="primary">
      Validate
    </Button>
  );
}
