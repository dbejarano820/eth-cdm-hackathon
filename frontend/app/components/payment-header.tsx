'use client';
import { BadgeDelta, Card, Metric, Text } from '@tremor/react';
import { determineBadge } from './order-card';

export default function PaymentHeader({
  order_status
}: {
  order_status: string;
}) {
  return (
    <div className="flex flex-col gap-2 items-center mb-3">
      <Metric className="text-center mb-1">Payment</Metric>
      {determineBadge(order_status)}
    </div>
  );
}
