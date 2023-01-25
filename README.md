# Solana dev repository

Repository dedicated to learning Solana

## Installs

For rust we need to install `rustup` this will come with `cargo`.

```
curl https://sh.rustup.rs -sSf | sh
```

For Solana CLI:

```
sh -c "$(curl -sSfL https://release.solana.com/v1.14.13/install)"
export PATH="/home/user/.local/share/solana/install/active_release/bin:$PATH"
```

Install Anchor:

some dependendcies for linux machines:

```
sudo apt-get update && sudo apt-get upgrade && sudo apt-get install -y pkg-config build-essential libudev-dev libssl-dev
```

cargo install anchor

```
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
```

```
avm install latest
avm use latest
```

