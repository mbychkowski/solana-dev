import React, { useState, useEffect } from 'react';
import * as anchor from '@coral-xyz/anchor';
import {
  Connection,
  PublicKey,
  clusterApiUrl,
} from '@solana/web3.js';
import { Program, AnchorProvider, web3 } from '@project-serum/anchor';
import CreationForm from '@/components/CreationForm';

import styled from 'styled-components';
import ButtonStyled from '../styles/ButtonStyled';

import kp from '../keypair.json';

const YOUR_PROGRAM_ADDRESS_HERE =
  '5sAeFvKkycHzV7DWMnLfZY8754CcKwWJiE885UxEooeX';

// SystemProgram is a reference to the Solana runtime!
const { SystemProgram, Keypair } = web3;

// Create a keypair for the account that will hold the GIF data.
const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);
const baseAccount = web3.Keypair.fromSecretKey(secret);

// This is the address of your solana program, if you forgot, just run solana address -k target/deploy/myepicproject-keypair.json
const programID = new PublicKey(YOUR_PROGRAM_ADDRESS_HERE);

// Set our network to devnet.
const network = clusterApiUrl('devnet');

// Controls how we want to acknowledge when a transaction is "done".
const opts = {
  preflightCommitment: 'processed',
};

export default function Index() {
  const [provider, setProvider] = useState<AnchorProvider>();
  const [program, setProgram] = useState<Program>();

  const getProvider = () => {
    const { preflightCommitment } = opts;

    const connection = new Connection(network, preflightCommitment);

    const provider = new AnchorProvider(connection, window.solana, {
      preflightCommitment,
    });

    return provider;
  };

  const getProgram = async () => {
    // Get metadata about your solana program
    const provider = getProvider();
    setProvider(provider);

    const idl = await Program.fetchIdl(programID, provider);

    // Create a program that you can call
    return new Program(idl, programID, provider);
  };

  const createAccount = async () => {
    try {
      const provider = getProvider();
      const program = await getProgram();

      console.log('ping');
      await program.methods
        .initialize()
        .accounts({
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([baseAccount])
        .rpc();

      console.log(
        'Created a new BaseAccount w/ address:',
        baseAccount.publicKey.toString()
      );
    } catch (error) {
      console.log('Error creating BaseAccount account:', error);
    }
  };

  useEffect(() => {
    const fetchProgram = async () => {
      const program = await getProgram();
      setProgram(program);
    };

    console.log('Fetching game items...');

    fetchProgram().catch(console.error);
  }, []);

  // Don't think I need this if you set up everything correct before time.
  // Program keypair

  const newAccount = () => (
    <div>
      <ButtonStyled onClick={createAccount}>
        Do One-Time Initialization For GIF Program Account
      </ButtonStyled>
    </div>
  );

  const ExistingAccount = () => {
    return (
      <CreationForm
        baseAccount={baseAccount}
        provider={provider}
        program={program}
      />
    );
  };

  return program && ExistingAccount();
}
