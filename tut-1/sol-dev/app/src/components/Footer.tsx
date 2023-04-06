export default function Footer() {
  // Constants
  const TWITTER_HANDLE = '_buildspace'
  const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`
  const TWITTER_LOGO = 'twitter-logo.svg'

  return (
    <div className="footer-container">
      <img alt="Twitter Logo" className="twitter-logo" src={TWITTER_LOGO} />
      <a
        className="footer-text"
        href={TWITTER_LINK}
        target="_blank"
        rel="noreferrer"
      >{`built on @${TWITTER_HANDLE}`}</a>
    </div>
  )
}
