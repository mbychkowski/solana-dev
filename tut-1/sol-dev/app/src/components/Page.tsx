import { createGlobalStyle } from 'styled-components'
import styled from 'styled-components'
import Header from './Header'
import Footer from './Footer'

const GlobalStyles = createGlobalStyle`
  html {
    --black: #011627;
    --maxWidth: 1000px;
    --bs: 0 12px 24px 0 rgba(0,0,0,00.09);
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
  }

  a {
    text-decoration: none;
    color: var(--black, black);
  }

  a:hover {
    text-decoration: underline;
  }

  button {
    font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .page {
    height: 100vh;
    background-color: #1a202c;
    display: flex;
    flex-direction: column;
  }
`

const InnerStyled = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
  flex: 1 0 auto;
`;

export default function Page(props: { children: any }) {

  return (
    <>
      <GlobalStyles />
      <div className='page'>
        <Header />
        <InnerStyled>
          {props.children}
        </InnerStyled>
        <Footer />
      </div>
    </>
  )
}
