import styled from 'styled-components';

const ButtonStyled = styled.button`
  height: 45px;
  border: 0;
  padding-left: 40px;
  padding-right: 40px;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;

  justify-content: center;

  background: -webkit-linear-gradient(left, #60c657, #35aee2);
  background-size: 200% 200%;
  animation: gradient-animation 4s ease infinite;
`;

export default ButtonStyled;
