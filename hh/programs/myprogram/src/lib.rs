use anchor_lang::prelude::*;

declare_id!("5sAeFvKkycHzV7DWMnLfZY8754CcKwWJiE885UxEooeX");

#[program]
pub mod myprogram {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> Result <()> {
        let base_account = &mut ctx.accounts.base_account;
        base_account.item_count = 0;

        Ok(())
    }

    pub fn add_item(ctx: Context<AddItem>, name: String, attack: u64) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;
        let user = &mut ctx.accounts.user;

        let item = ItemStruct {
            name: name.to_string(),
            attack: attack,
            user_address: *user.to_account_info().key,
        };

        base_account.item_list.push(item);
        base_account.item_count += 1;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info>  {
    #[account(init, payer = user, space = 9000)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddItem<'info>  {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,

    #[account(mut)]
    pub user: Signer<'info>,
}

#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct ItemStruct  {
    pub name: String,
    pub attack: u64,
    pub user_address: Pubkey,
}

#[account]
pub struct BaseAccount {
    pub item_count: u64,
    pub item_list: Vec<ItemStruct>,
}