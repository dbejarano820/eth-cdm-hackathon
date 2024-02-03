'use client';
import { BadgeDelta, Card, Metric, Text } from "@tremor/react";

export default function MerchantBalance({ balance, interest } : { balance: number, interest: number }) {
  return (
    <Card className="max-w-xs mx-auto" decoration="top" decorationColor="indigo">
      <div className="flex justify-between">
      <Text>Balance</Text>
        <BadgeDelta deltaType="moderateIncrease" isIncreasePositive={true} size="xs">
        +${interest.toLocaleString()}
      </BadgeDelta>
      </div>

        <div className="flex items-center justify-between">
            <Metric>${balance.toLocaleString()}</Metric>
        </div>
    </Card>
  );
}
