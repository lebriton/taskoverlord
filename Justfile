alias dev := develop

build *args='':
    pnpm tauri build {{args}}

develop:
    pnpm tauri dev

pre-commit:
    cd backend && cargo clippy -- -Dwarnings
    cd backend && cargo fmt --all -- --config-path rustfmt.toml
    pnpm -F frontend format

setup:
    pnpm install
