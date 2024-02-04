import { sql } from '@vercel/postgres';
import { Title, Text, Button, Divider } from '@tremor/react';
import Search from './search';
import MerchantBalance from './components/merchant-balance';
import { Order, Wallet } from './interfaces';
import OrderCard from './components/order-card';
import Link from 'next/link';
import { getUser } from './utils/getUser';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const user = getUser();
  const search = searchParams.q ?? '';
  //filter by current user_id as well

  console.log("user.id: ", user.id);
  const result = await sql`
      SELECT id, amount, payed_amount, order_status
      FROM Orders 
      WHERE CAST(id AS TEXT) ILIKE ${'%' + search + '%'} OR user_id = ${
        user.id
      };
  `;

  const orders = result.rows as Order[];

  const userData = await sql`
  SELECT *
  FROM Wallets 
  WHERE user_id = ${user.id};
`;
  const wallets = userData.rows;

  const totalBalance = wallets.reduce((acc, wallet) => acc + wallet.balance, 0);

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <MerchantBalance balance={totalBalance} interest={totalBalance * 0.03} />
      <div className="flex justify-around mt-5">
        <Link href="/order">
          <Button variant="light" className="text-xl">
            + Create new order
          </Button>
        </Link>
      </div>
      <Divider />
      <div className="p-2">
        <Title>Payments history</Title>
        <Search />
        <div className="mt-2 overflow-auto h-96">
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
