import { sql } from '@vercel/postgres';
import { Card, Title, Text } from '@tremor/react';
import Search from './search';
import UsersTable from './table';
import MerchantBalance from './components/merchant-balance';
import { Order } from './interfaces';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
   const search = searchParams.q ?? '';
   //filter by current user_id as well
    const result = await sql`
      SELECT id, amount, payed_amount, order_status
      FROM Orders 
      WHERE CAST(id AS TEXT) ILIKE ${'%' + search + '%'};
    `;
    const orders = result.rows as Order[];

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <MerchantBalance balance={9141} interest={13} />
        <div className='p-4'>
        <Title>Historial</Title>
        <Search />
        <div className='mt-6 overflow-auto h-96'>
          {orders.length > 0 ? (
            orders.map((order) => (
              //Create client component for payment history -> clickable toast for info
              <Card key={order.id} className='mt-6'>
                <Text>Description: {order.description}</Text>
                <Text>Amount: {order.amount}</Text>
                <Text>Amount Payed: {order.payed_amount}</Text>
                <Text>Order Status: {order.order_status}</Text>
              </Card>
            ))
          ) : (
            <Text>No orders found.</Text> // Handling for empty orders array
          )}
        </div>
      </div>
    </main>
  );
}

