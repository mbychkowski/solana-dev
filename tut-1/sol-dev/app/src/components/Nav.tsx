import Link from 'next/link'

export default function Nav() {
  return (
    <nav>
      <Link href="/gifs">Gifs</Link>
      <Link href="/pictures">Pictures</Link>
      <Link href="/upload">Upload</Link>
    </nav>
  )
}
