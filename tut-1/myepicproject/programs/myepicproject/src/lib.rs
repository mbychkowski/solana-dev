use anchor_lang::prelude::*;

declare_id!("2skVNsoum7EW7ocrznr4YnryBQP7zrBjSZGMpUDvrfPs");

#[program]
pub mod myepicproject {
  use super::*;

  pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
    let base_account = &mut ctx.accounts.base_account;
    base_account.total_gifs = 0;
    Ok(())
  }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
  #[account(init, payer = user, space = 9000)]
  pub base_account: Account<'info, BaseAccount>,
  #[account(mut)]
  pub user: Signer<'info>,
  pub system_program: Program<'info, System>,
}

#[account]
pub struct BaseAccount {
  total_gifs: u64,
}
