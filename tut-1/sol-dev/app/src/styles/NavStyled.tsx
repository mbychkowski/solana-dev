import styled from 'styled-components'

const NavStyled = styled.nav`
  a, button {
    padding: 1rem 3rem;
    align-items: center;
    text-transform: uppercase;
    color: var(--white, white);
  }

  display: flex;
  align-items: center;
  justify-content: center;
  max-width: var(--maxWidth)
  font-size: 1.4rem;
  border-bottom: 10px solid var(--white, white);
`

export default NavStyled
