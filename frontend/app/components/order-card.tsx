'use client';
import { Card, Title, Text, Badge } from '@tremor/react';
import { Order, OrderStatusLabel } from '../interfaces';
import ClockIcon from '../icons/ClockIcon';
import ExpiredIcon from '../icons/ExpiredIcon';
import MagnifyingIcon from '../icons/MagnifyingIcon';
import ShoppingCartIcon from '../icons/ShoppingCartIcon';
import { CheckBadgeIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

function determineBadge(status: string) {
  switch (status) {
    case 'Pending':
      return (
        <Badge color="blue" icon={ClockIcon}>
          Pending  
        </Badge>
      );
    case 'Completed':
      return (
        <Badge color="green" icon={CheckIcon}>
          Completed
        </Badge>
      );
    case 'Incomplete':
      return (
        <Badge color="orange" icon={XMarkIcon}>
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
  const divStyle = {
    backgroundColor: '#faf7f7',  
    border: '1px solid #ddd',      
    padding: '4%', 
    borderRadius: '15px', 
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const imageStyle = {
    width: '25px',
    height: '25px'
  };

  return (
    <Card style={divStyle} className="mx-0 my-2">
      <div>
      {determineBadge(order.order_status)}
        <h1 style={{ fontSize: '1.5rem', color: '#636262' }}>$ {order.amount.toLocaleString()+',00'}</h1>
        {/* {order.description} */}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <img src="https://cryptologos.cc/logos/avalanche-avax-logo.png?v=029" alt="Avalanche Logo" style={imageStyle} /> 
        <h1 style={{ fontSize: '1rem', color: '#636262', marginLeft: '5px', paddingTop: '14px' }}>#2A4C1</h1>
      </div>
    </Card>
  );
}
