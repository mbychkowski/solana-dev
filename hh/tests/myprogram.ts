import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Myprogram } from '../target/types/myprogram';
import { BN } from 'bn.js';

const { SystemProgram } = anchor.web3;

const assert = require('assert');

describe('myprogram', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Myprogram as Program<Myprogram>;

  const baseAccount = anchor.web3.Keypair.generate();

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.methods
      .initialize()
      .accounts({
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([baseAccount])
      .rpc();
    console.log('Your transaction signature', tx);
  });

  it('It has item count!', async () => {
    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );

    console.log('👀 Item count -->', account.itemCount.toString());
  });

  it('It can add to item count!', async () => {
    await program.methods
      .addItem('sword', new anchor.BN(5))
      .accounts({
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      })
      .rpc();

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );

    assert.notEqual(account.itemCount.toString(), '0');

    console.log(
      '👀 More items added -->',
      account.itemCount.toString() !== '0'
    );
  });

  it('Describe item list', async () => {
    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    console.log('👀 Item list -->', account.itemList);
  });
});
