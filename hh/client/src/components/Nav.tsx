import Link from 'next/link';
import NavStyled from '../styles/NavStyled';

export default function Nav() {
  return (
    <NavStyled>
      <ul>
        <Link href="/items">Items</Link>
        <Link href="/spells">Spells</Link>
        <Link href="/characters">Characters</Link>
      </ul>
    </NavStyled>
  );
}
