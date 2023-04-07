import React, { useEffect, useState } from 'react'
import Head from 'next/head'
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

const ButtonStyled = styled.button`
  height: 45px;
  border: 0;
  padding-left: 40px;
  padding-right: 40px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: white;

  justify-content: center;

  background: -webkit-linear-gradient(left, #60c657, #35aee2);
  background-size: 200% 200%;
  animation: gradient-animation 4s ease infinite;
`

export default function Page(props: { children: any }) {
  const [walletAddress, setWalletAddress] = useState(null)

  const checkIfWalletIsConnected = async () => {
    if (window?.solana?.isPhantom) {
      console.log('Phantom wallet found')
      const response = await window.solana.connect({ onlyIfTrusted: true })

      console.log('Connected with Public Key:', response.publicKey.toString())
      setWalletAddress(response.publicKey.toString())
    } else {
      alert('Solana object not found! Get a Phantom Wallet 👻')
    }
  }

  const connectWallet = async () => {
    const { solana } = window

    if (solana) {
      const response = await solana.connect()
      console.log('Connected with Public Key:', response.publicKey.toString())
      setWalletAddress(response.publicKey.toString())
    }
  }

  const renderNotConnectedContainer = () => (
    <ButtonStyled
      className="cta-button connect-wallet-button"
      onClick={connectWallet}>
      Connect to Wallet
    </ButtonStyled>
  )

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected()
    }
    if (document.readyState == "complete") {
      onLoad()
    } else {
      window.addEventListener('load', onLoad)
      return () => window.removeEventListener('load', onLoad)
    }
  }, [])

  return (
    <>
      <GlobalStyles />
      <Head>
        <title>Solana App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='page'>
        <Header />
        <InnerStyled>
          {!walletAddress && renderNotConnectedContainer()}
          {props.children}
        </InnerStyled>
        <Footer />
      </div>
    </>
  )
}
