'use client';
import { Button } from '@tremor/react';

export function PaymentButton({
  txHash,
  orderId
}: {
  txHash: string;
  orderId: string;
}) {
  const handleSubmit = async () => {
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
    <Button onClick={() => handleSubmit} variant="light">
      Submit TX Hash
    </Button>
  );
}
