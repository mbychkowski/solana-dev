import React, { useEffect, useState } from 'react';
import * as anchor from '@coral-xyz/anchor';
import { Program, AnchorProvider } from '@project-serum/anchor';
import List from './List';

import styled from 'styled-components';
import ButtonStyled from '../styles/ButtonStyled';

const FormStyled = styled.form`
  label {
    /* display: inline; */
    width: 140px;
    display: inline-block;
    text-align: right;
    margin-right: 10px;
  }
  textarea:focus,
  input:focus {
    outline: none !important;
    border: 2px solid #60c657;
  }
  input {
    padding-left: 20px;
    border-radius: 1rem;
    height: 45px;
  }

  button {
    margin: auto;
    width: 80px;
  }

  /* display: inline-block; */
  border: none;
  margin: auto;
  text-align: right;
  padding: 0;
  color: var(--white, white);
  width: 320px;
`;

const ItemStyled = styled.div`
  display: flex;
  font-size: 1rem;
  font-family: monospace;
  color: var(--white, white);
`;

export default function CreationForm({ ...props }) {
  const [inputValue, setInputValue] = useState({
    name: '',
    attack: -1,
  });

  const [itemList, setItemList] = useState<any[]>([]);

  useEffect(() => {
    console.log('Fetching game items...');

    getItemList();
  }, []);

  const onInputchange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const getItemList = async () => {
    const { program, baseAccount } = props;

    try {
      const account = await program.account.baseAccount.fetch(
        baseAccount.publicKey
      );
      console.log('Got the account', account);
      setItemList(account.itemList);
    } catch (error) {
      console.log('Error in getItemList: ', error);
      setItemList(null);
    }
  };

  const sendItem = async () => {
    if (inputValue.name !== '' || inputValue.attack !== -1) {
      console.log('No item listed:');
    }

    const { program, provider, baseAccount } = props;

    setInputValue({ name: '', attack: 0 });
    const { name, attack } = inputValue;

    try {
      await program.methods
        .addItem(name, new anchor.BN(attack))
        .accounts({
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
        })
        .rpc();
    } catch (error) {
      console.log('Error sending item:', error);
    }
  };

  return (
    <>
      <FormStyled
        onSubmit={(e) => {
          e.preventDefault();
          sendItem();
        }}
      >
        <label>name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter Item name!"
          value={inputValue.name}
          onChange={onInputchange}
        />
        <label>attack</label>
        <input
          type="number"
          name="attack"
          placeholder="-1"
          value={inputValue.attack}
          onChange={onInputchange}
        />
        <ButtonStyled type="submit">Submit</ButtonStyled>
      </FormStyled>
      <List>
        {itemList &&
          itemList.map((item, index) => (
            <ItemStyled key={index}>
              [ {item.userAddress.toString()} | {item.name}: attack:{' '}
              {item.attack.toString()} ]{' '}
            </ItemStyled>
          ))}
      </List>
    </>
  );
}
