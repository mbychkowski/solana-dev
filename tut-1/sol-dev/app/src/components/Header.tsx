import Link from 'next/link'
import styled from 'styled-components'
import Nav from './Nav'

const LogoStyled = styled.h1`
  font-size: 4rem;
  position: relative;
  z-index: 2;
  margin: 2rem;
  background: var(--black, black);
  a {
    color: white;
    font-weight: bold;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
`

const HeaderStyled = styled.header`
  .logo-container {
    display: grid;
    grid-template-columns: auto 1fr;
    border-bottom: 10px solid var(--black, #011627);
    justify-content: space-between;
    align-items: center;
  }

  .sub-text-container {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--black, black);
  }
`

export default function Header() {
  return (
    <HeaderStyled>
      <div className="logo-container">
        <LogoStyled>
          <Link href="/">🖼 GIF Portal</Link>
        </LogoStyled>
      </div>
      <div className="sub-text-container">
        <p>
          View your GIF collection in the metaverse ✨
        </p>
      </div>
      <Nav />
    </HeaderStyled>
  )
}
