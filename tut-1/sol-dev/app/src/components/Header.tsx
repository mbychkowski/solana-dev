import Link from 'next/link'
import styled from 'styled-components'
import Nav from './Nav'

const HeaderStyled = styled.header`
  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sub-text-container {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white, white);
  }
`

const LogoStyled = styled.h1`
  font-size: 4rem;
  position: relative;
  z-index: 2;
  a {
    color: white;
    font-weight: bold;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
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
      <Nav />
      <div className="sub-text-container">
        <p>
          View your GIF collection in the metaverse ✨
        </p>
      </div>
    </HeaderStyled>
  )
}
