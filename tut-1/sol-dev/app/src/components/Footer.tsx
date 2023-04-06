import styled from 'styled-components'

const TwitterLogoStyled = styled.img`
  width: 28px;
  height: 28px;
`

const FooterStyled = styled.footer`
  .footer-container {
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }

  a {
    color: white;
  }
`

export default function Footer() {
  // Constants
  const TWITTER_HANDLE = '_buildspace'
  const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`
  const TWITTER_LOGO = 'twitter-logo.svg'

  return (
    <FooterStyled className="footer-container">
      <TwitterLogoStyled alt="Twitter Logo" className="twitter-logo" src={TWITTER_LOGO} />
      <a
        className="footer-text"
        href={TWITTER_LINK}
        target="_blank"
        rel="noreferrer"
      >{`built on @${TWITTER_HANDLE}`}</a>
    </FooterStyled>
  )
}
