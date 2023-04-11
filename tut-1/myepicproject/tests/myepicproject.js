const anchor = require('@coral-xyz/anchor');
const { SystemProgram } = anchor.web3;

const main = async () => {
  console.log('🚀 Starting test...');
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  // Add your test here.
  const program = anchor.workspace.Myepicproject;

  const baseAccount = anchor.web3.Keypair.generate();

  const tx = await program.rpc.initialize({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount],
  });
  console.log('Your transaction signature', tx);

  let account = await program.account.baseAccount.fetch(
    baseAccount.publicKey
  );
  console.log('👀 Gif account', account.totalGifs.toString());
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

runMain();
