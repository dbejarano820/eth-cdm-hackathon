'use client';
import { Card, Metric, Text } from "@tremor/react";

export default function MerchantBalance({ balance, interest } : { balance: number, interest: number }) {
  return (
    <Card className="max-w-xs mx-auto" decoration="top" decorationColor="indigo">
        <Text>Balance</Text>
        <div className="flex items-center justify-between">
            <Metric>${balance.toLocaleString()}</Metric>
            <div className="flex items-center text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
</svg>

                <Text>+${interest.toLocaleString()}</Text>
            </div>
        </div>
    </Card>
  );
}
