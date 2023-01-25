import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { ProgramRust } from "../target/types/program_rust";

describe("program-rust", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.ProgramRust as Program<ProgramRust>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
