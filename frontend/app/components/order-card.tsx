'use client';
import { Card, Title, Text, Badge } from '@tremor/react';
import { Order, OrderStatusLabel } from '../interfaces';
import ClockIcon from '../icons/ClockIcon';
import ExpiredIcon from '../icons/ExpiredIcon';
import MagnifyingIcon from '../icons/MagnifyingIcon';
import ShoppingCartIcon from '../icons/ShoppingCartIcon';

function determineBadge(status: string) {
  switch (status) {
    case 'Pending':
      return <Badge icon={ClockIcon}>Pending</Badge>;
    case 'Completed':
      return (
        <Badge color="green" icon={ShoppingCartIcon}>
          Completed
        </Badge>
      );
    case 'Incomplete':
      return (
        <Badge color="red" icon={MagnifyingIcon}>
          Incomplete
        </Badge>
      );
    case 'Expired':
      return (
        <Badge color="red" icon={ExpiredIcon}>
          Expired
        </Badge>
      );
    default:
      return <Badge icon={ShoppingCartIcon}>Unknown Status</Badge>;
  }
}

export default function OrderCard({ order }: { order: Order }) {
  return (
    <Card className="max-w-xs mx-auto my-3">
      <div className="flex justify-between">
        <Text>Order #{order.id}</Text>
        {determineBadge(order.order_status)}
      </div>
      <div className="flex flex-col items-center justify-between">
        <Title>${order.amount.toLocaleString()}</Title>
        <Text>{order.description || 'sin detalles...'}</Text>
      </div>
    </Card>
  );
}
