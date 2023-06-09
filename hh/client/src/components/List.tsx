import React from 'react';
import styled from 'styled-components';

const ListHolder = styled.div`
  img {
    width: 100%;
    height: 300px;
    border-radius: 10px;
    object-fit: cover;
  }
`;

export default function List(props: { children: any }) {
  return (
    <ListHolder className="list-item">
      <ul>{props.children}</ul>
    </ListHolder>
  );
}
