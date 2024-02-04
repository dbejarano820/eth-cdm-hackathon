import { sql } from '@vercel/postgres';
import { Title, Text, Button, Divider } from '@tremor/react';
import Search from './search';
import MerchantBalance from './components/merchant-balance';
import { Order } from './interfaces';
import OrderCard from './components/order-card';
import Link from 'next/link';

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
      <div className="flex justify-around mt-3">
        <Link href="/order">
          <Button variant="light" className="text-xl">
            + Create new order
          </Button>
        </Link>
      </div>
      <Divider />
      <div className="p-4">
        <Title>Payments history</Title>
        <Search />
        <div className="mt-6 overflow-auto h-96">
          {orders.length > 0 ? (
            orders.map((order) => <OrderCard order={order} />)
          ) : (
            <Text>No orders found.</Text>
          )}
        </div>
      </div>
      <Divider />
      <Text>@KoomunaLabs 2024</Text>
    </main>
  );
}
