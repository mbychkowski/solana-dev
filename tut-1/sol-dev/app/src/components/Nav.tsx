import Link from 'next/link'
import NavStyled from '../styles/NavStyled'

export default function Nav() {
  return (
    <NavStyled>
      <ul>
        <Link href="/gifs">Gifs</Link>
        <Link href="/pictures">Pictures</Link>
        <Link href="/upload">Upload</Link>
      </ul>
    </NavStyled>

  )
}
