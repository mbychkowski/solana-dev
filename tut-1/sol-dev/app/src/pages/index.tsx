import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import ButtonStyled from '../styles/ButtonStyld'

const TEST_GIFS = [
  'https://i.giphy.com/media/eIG0HfouRQJQr1wBzz/giphy.webp',
  'https://media3.giphy.com/media/L71a8LW2UrKwPaWNYM/giphy.gif?cid=ecf05e47rr9qizx2msjucl1xyvuu47d7kf25tqt2lvo024uo&rid=giphy.gif&ct=g',
  'https://media4.giphy.com/media/AeFmQjHMtEySooOc8K/giphy.gif?cid=ecf05e47qdzhdma2y3ugn32lkgi972z9mpfzocjj6z1ro4ec&rid=giphy.gif&ct=g',
  'https://i.giphy.com/media/PAqjdPkJLDsmBRSYUp/giphy.webp'
]

const GifHolder = styled.div`
  img {
    width: 100%;
    height: 300px;
    border-radius: 10px;
    object-fit: cover;
  }
`

export default function Index() {
  const [inputValue, setInputValue] = useState<string>('')
  const [gifList, setGifList] = useState<string[]>([])

  useEffect(() => {
    console.log('Fetching gif list...')

    setGifList(TEST_GIFS)
  }, [])

  const onInputchange = (e) => {
    const {value} = e.target
    setInputValue(value)
  }

  const sendGif = async() => {
    if (inputValue.length > 0) {
      console.log('Gif link:', inputValue)
      setGifList([...gifList, inputValue])
      setInputValue('')
    } else {
      console.log('Empty input. Try again.')
    }
  }

  return (
    <>
      <form onSubmit={e => {
        e.preventDefault()
        sendGif()}}>
        <input type="text"
          placeholder="Enter Gif link!"
          value={inputValue}
          onChange={onInputchange}/>
        <ButtonStyled type="submit">Submit</ButtonStyled>
      </form>
      {
        gifList.map((gif) => (
          <GifHolder className="gif-item" key={gif}>
            <img src={gif} alt={gif} />
          </GifHolder>
        ))
      }
    </>
  )
}
