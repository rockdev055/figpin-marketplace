import Link from 'next/link';
import NavbarStyles from './styles/NavbarStyles';

const Navbar = () => (
  <NavbarStyles>
    <Link href="/pins">
      <a>Pins</a>
    </Link>
    <Link href="/sell-pin">
      <a>Sell</a>
    </Link>
    <Link href="/signup">
      <a>Signup</a>
    </Link>
    <Link href="/orders">
      <a>Orders</a>
    </Link>
    <Link href="/account">
      <a>Account</a>
    </Link>
  </NavbarStyles>
);

export default Navbar;
