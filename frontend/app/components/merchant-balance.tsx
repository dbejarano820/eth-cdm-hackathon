'use client';
import { BadgeDelta, Card, Metric, Text } from '@tremor/react';

export default function MerchantBalance({
  balance,
  interest
}: {
  balance: number;
  interest: number;
}) {
  return (
    <Card
      style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
      className="mx-0 mx-auto"
      decoration="left"
      decorationColor="blue"
    >
      <div className="flex justify-between">
        <Text>Balance</Text>
        <BadgeDelta
          deltaType="moderateIncrease"
          isIncreasePositive={true}
          size="xs"
        >
          + ${interest.toLocaleString() + ',00'}
        </BadgeDelta>
      </div>
      <div className="flex items-center justify-between">
        <h1 style={{ fontSize: '2rem', color: '#434242' }}>
          $ {balance.toLocaleString() + ',00'}
        </h1>
        {/* <h1>$ {balance.toLocaleString()}</h1> */}
      </div>
    </Card>
  );
}
