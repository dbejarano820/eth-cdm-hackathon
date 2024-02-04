import Navbar from './navbar';
import { auth } from './auth';
import { getUser } from './utils/getUser';

export default async function Nav() {
  // const session = await auth();
  const user = getUser();
  return <Navbar user={user} />;
}
