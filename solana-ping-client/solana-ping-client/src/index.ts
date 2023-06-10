import web3 = require('@solana/web3.js');
import Dotenv from 'dotenv';

Dotenv.config();

const NETWORK = web3.clusterApiUrl('devnet');
const PROGRAM_ADDRESS =
  'ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa';
const PROGRAM_DATA_ADDRESS =
  'Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod';

function initializeKeyPair(privateKey: string): web3.Keypair {
  const secret = JSON.parse(
    process.env[privateKey] ?? ''
  ) as number[];
  const secretKey = Uint8Array.from(secret);
  const keypairFromSecretKey = web3.Keypair.fromSecretKey(secretKey);
  return keypairFromSecretKey;
}

async function pingProgram(
  connection: web3.Connection,
  payer: web3.Keypair
) {
  const transaction = new web3.Transaction();

  const programId = new web3.PublicKey(PROGRAM_ADDRESS);
  const programDataPubkey = new web3.PublicKey(PROGRAM_DATA_ADDRESS);

  const instruction = new web3.TransactionInstruction({
    keys: [
      {
        pubkey: programDataPubkey,
        isSigner: false,
        isWritable: true,
      },
    ],
    programId,
  });

  transaction.add(instruction);

  const signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [payer]
  );

  console.log(
    `You can view your transaction on the Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`
  );
}

async function transferSol(
  connection: web3.Connection,
  payer: web3.Keypair,
  recipient: web3.Keypair,
  amount: number
) {
  const transaction = new web3.Transaction();

  const instruction = web3.SystemProgram.transfer({
    fromPubkey: payer.publicKey,
    toPubkey: recipient.publicKey,
    lamports: web3.LAMPORTS_PER_SOL * amount,
  });

  transaction.add(instruction);

  const signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [payer]
  );

  console.log(
    `You can view your transaction on the Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`
  );
}

async function main() {
  const payer = initializeKeyPair('PAYER_PRIVATE_KEY');
  const recipient = initializeKeyPair('RECIPIENT_PRIVATE_KEY');
  const connection = new web3.Connection(NETWORK);
  await connection.requestAirdrop(
    payer.publicKey,
    web3.LAMPORTS_PER_SOL * 1
  );

  // pingProgram(connection, payer);
  transferSol(connection, payer, recipient, 0.5);
}

main()
  .then(() => {
    console.log('Finished execution');
  })
  .catch((error) => {
    console.error(error);
  });
